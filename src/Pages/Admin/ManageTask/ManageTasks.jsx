import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../Axios/useAxiosSecure";
import { Helmet } from "react-helmet";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Aos from "aos";
import { GoSortDesc } from "react-icons/go";

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

  // Sorting State
  const [sortOrder, setSortOrder] = useState("asc");

  // Handle Sorting
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Sort data based on payable_amount
  const sortedTasks = [...(data || [])].sort((a, b) =>
    sortOrder === "asc"
      ? a.payable_amount - b.payable_amount
      : b.payable_amount - a.payable_amount
  );

  // Calculate total pages
  const totalPages = Math.ceil(sortedTasks?.length / itemsPerPage);

  // Get tasks for the current page
  const currentTasks = sortedTasks.slice(
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
    <div className="min-h-screen p-2">
      <Helmet>
        <title>Manage Task || Admin</title>
      </Helmet>
      <DashboardTitle title={"Manage Tasks"} />
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="mb-6 flex flex-col md:flex-row  md:justify-between items-center"
      >
        <div className="flex gap-4 items-center my-2">
          <h2 className="text-base lg:text-lg font-medium text-gray-500">
            Total Tasks:
          </h2>
          <span className="text-base lg:text-lg font-medium">
            {data?.length}
          </span>
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleSort}
        >
          <p className="text-gray-500">Sort by Amount</p>
          <GoSortDesc
            className={`text-gray-500 transform text-xl ${
              sortOrder === "asc" ? "rotate-180" : ""
            }`}
          />
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
            <div className="overflow-x-auto border-t-4 border-primaryColor rounded shadow-md">
              <table className="table w-full text-xs">
                <thead className="">
                  <tr className="border-b">
                    <th>#</th>
                    <th>Buyer Email</th>
                    <th>Task Title</th>
                    <th>Workers</th>
                    <th>Payable</th>
                    <th>Deadline</th>
                    <th>Submission Info</th>
                    <th>Total Payable</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {currentTasks?.map((task, i) => (
                    <tr key={task._id} className={`border-b`}>
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
                          className="bg-btnColor cursor-pointer hover:bg-primaryColor text-white p-2 rounded flex items-center gap-2 transition duration-300 ease-in-out transform hover:scale-105"
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

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`btn btn-sm ${
                    currentPage === index + 1
                      ? "bg-primaryColor text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
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
