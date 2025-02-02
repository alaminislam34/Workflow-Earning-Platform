import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../Axios/useAxiosSecure";
import { Helmet } from "react-helmet";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Aos from "aos";

const ManageTasks = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosInstance("/tasks", { withCredentials: true });
      return res.data;
    },
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  // Get tasks for the current page
  const currentTasks = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle delete task
  const handleDelete = async (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6F00",
      cancelButtonColor: "#179221",
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/taskDelete/${taskId}`);
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
            timer: 2000,
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: `${error.message} Please try again.`,
            icon: "error",
          });
        }
      }
    });
  };

  useEffect(() => {
    Aos.init({
      once: true,
      offset: 300,
      duration: 2000,
      delay: 300,
    });
  }, [data, currentTasks]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Manage Task || Admin</title>
      </Helmet>
      <DashboardTitle title={"Manage Tasks"} />
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="mb-6"
      >
        <div className="flex gap-4 items-center my-2 px-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700">
            Total Tasks:
          </h2>
          <span className="text-lg md:text-xl font-bold">{data?.length}</span>
        </div>
      </div>

      <section
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className=""
      >
        {isLoading ? (
          <div className="w-full flex justify-center items-center h-[70vh]">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div>
            <div className="overflow-x-auto border-t-4 border-primaryColor bg-white rounded-lg shadow-lg">
              <table className="table w-full text-xs ">
                <thead className="bg-gray-100 text-gray-700">
                  <tr className="border-b border-gray-300">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Buyer Email</th>
                    <th className="py-3 px-4">Task Title</th>
                    <th className="py-3 px-4">Workers</th>
                    <th className="py-3 px-4">Payable</th>
                    <th className="py-3 px-4">Deadline</th>
                    <th className="py-3 px-4">Submission Info</th>
                    <th className="py-3 px-4">Total Payable</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {currentTasks?.map((task, i) => (
                    <tr
                      key={task._id}
                      className={`border-b hover:bg-gray-50 transition duration-200 `}
                    >
                      <td className="py-3 px-4">
                        {(currentPage - 1) * itemsPerPage + i + 1}
                      </td>
                      <td className="py-3 px-4">{task.buyer_email}</td>
                      <td className="py-3 px-4" title={task.task_title}>
                        {task.task_detail.slice(0, 20)}...
                      </td>
                      <td className="py-3 px-4">{task.required_workers}</td>
                      <td className="py-3 px-4">$ {task.payable_amount}</td>
                      <td className="py-3 px-4">{task.completion_date}</td>
                      <td className="py-3 px-4">{task.submission_info}</td>
                      <td className="py-3 px-4">$ {task.totalPayableAmount}</td>
                      <td className="py-3 px-4 flex justify-center items-center">
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="bg-btnColor hover:bg-primaryColor text-white p-2 rounded flex items-center gap-2 transition duration-300 ease-in-out transform hover:scale-105"
                          title="Delete Task"
                        >
                          <AiFillDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center p-4">
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="btn btn-sm hover:bg-primaryColor bg-white text-black shadow-xl border-btnColor text-lg rounded-lg mr-2"
              >
                <MdChevronLeft />
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className="list-none mr-2">
                  <button
                    className={`btn btn-sm hover:bg-primaryColor ${
                      currentPage === index + 1
                        ? "bg-primaryColor text-white"
                        : "bg-gray-200 text-black"
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <button
                onClick={() =>
                  handlePageChange(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="btn btn-sm hover:bg-primaryColor bg-white text-black shadow-xl border-btnColor text-lg rounded-lg ml-2"
              >
                <MdChevronRight />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ManageTasks;
