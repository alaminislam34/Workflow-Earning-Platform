/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Auth/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { FaPen } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import axiosInstance from "../../../Axios/useAxiosSecure";

import useUpdateCoin from "../../../Hook/CoinUpdateHook/useUpdateCoin";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Aos from "aos";

const ITEMS_PER_PAGE = 5; // Number of items per page

const MyTaskTable = ({ userCoins }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const { user } = useContext(AuthContext);
  const { mutate } = useUpdateCoin();

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/buyerTasks?email=${user?.email}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);
  const currentTasks = tasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = async (task) => {
    const { _id, required_workers, payable_amount } = task;
    const refillAmount = required_workers * payable_amount;

    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the task and refund coins for incomplete tasks.",
      icon: "warning",
      confirmButtonColor: "#FF6F00",
      cancelButtonColor: "#179221",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No, keep it",
    });

    if (confirmation.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/taskDelete/${_id}`);
        if (response.status === 200) {
          mutate(
            { email: user?.email, newCoin: userCoins + refillAmount },
            {
              onSuccess: () => {
                Swal.fire("Success", "Task deleted successfully.", "success");
              },
              onError: (error) => {
                console.error("Error updating coin balance:", error);
              },
            }
          );
          refetch();
        }
      } catch (error) {
        console.error("Failed to delete task:", error);
        Swal.fire(
          "Error",
          "Failed to delete the task. Please try again.",
          "error"
        );
      }
    }
  };

  const handleUpdate = async (updatedTask) => {
    const { task_title, task_detail, submission_info } = updatedTask;

    const updatedData = { task_title, task_detail, submission_info };

    try {
      const response = await axiosInstance.patch(
        `/updateTask/${updatedTask._id}`,
        { updatedData },
        { withCredentials: true }
      );
      if (response.data.modifiedCount > 0) {
        refetch();
        Swal.fire(
          "Updated!",
          `${task_title} task has been updated.`,
          "success"
        );
        setEditingTask(null);
      }
    } catch (error) {
      console.error("Failed to update task:", error.message);
      Swal.fire(
        "Error",
        "Failed to update the task. Please try again.",
        "error"
      );
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    Aos.init({
      once: true,
      offset: 300,
      duration: 2000,
      delay: 300,
    });
  }, [currentTasks, tasks, user, userCoins]);

  return (
    <div>
      <h2
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="text-xl font-bold mb-4"
      >
        Total Tasks: {tasks.length}
      </h2>
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="overflow-x-auto rounded-lg shadow-lg bg-white"
      >
        <table className="w-full table">
          <thead>
            <tr className="bg-gray-300 text-gray-700">
              <th>#</th>
              <th>Title</th>
              <th>Details</th>
              <th>Required Workers</th>
              <th>Payable Amount</th>
              <th>Completion Date</th>
              <th>Submission Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.length > 0 ? (
              currentTasks.map((task, i) => (
                <tr
                  key={task._id}
                  className={` ${
                    new Date(task.completion_date) < new Date()
                      ? "bg-red-100"
                      : ""
                  }`}
                >
                  <td>{(currentPage - 1) * ITEMS_PER_PAGE + i + 1} </td>
                  <td className="px-4 py-2">
                    {editingTask && editingTask._id === task._id ? (
                      <input
                        type="text"
                        value={editingTask.task_title}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            task_title: e.target.value,
                          })
                        }
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      task.task_title
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingTask && editingTask._id === task._id ? (
                      <textarea
                        value={editingTask.task_detail}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            task_detail: e.target.value,
                          })
                        }
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      task.task_detail.slice(0, 20) + "..."
                    )}
                  </td>
                  <td className="px-4 py-2">{task.required_workers}</td>
                  <td className="px-4 py-2">$ {task.payable_amount}</td>
                  <td className="px-4 py-2">{task.completion_date}</td>
                  <td className="px-4 py-2">
                    {editingTask && editingTask._id === task._id ? (
                      <input
                        type="text"
                        value={editingTask.submission_info}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            submission_info: e.target.value,
                          })
                        }
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      task.submission_info
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingTask && editingTask._id === task._id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(editingTask)}
                          className="bg-green-500 text-white py-1 px-2 rounded mr-2 cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTask(null)}
                          className="bg-gray-500 text-white py-1 px-2 rounded cursor-pointer"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditingTask(task)}
                          className="bg-blue-500 text-white py-1 px-2 rounded mr-2 cursor-pointer"
                        >
                          <FaPen />
                        </button>
                        <button
                          onClick={() => handleDelete(task)}
                          className="bg-red-500 text-white py-1 px-2 rounded cursor-pointer"
                        >
                          <AiFillDelete />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="border border-gray-300 p-4 text-center text-gray-500"
                >
                  No tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="flex justify-center mt-4"
      >
        <div className="flex justify-center mt-4 p4">
          <ul className="flex items-center space-x-2">
            {/* Previous Button */}
            <li>
              <button
                className={`rounded-lg shadow-xl btn btn-sm hover:bg-primaryColor ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
              >
                <MdChevronLeft />
              </button>
            </li>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 mx-1 rounded ${
                  currentPage === index + 1
                    ? "bg-primaryColor text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
            {/* Next Button */}
            <li>
              <button
                className={`rounded-lg shadow-xl btn btn-sm hover:bg-primaryColor ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
              >
                <MdChevronRight />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyTaskTable;
