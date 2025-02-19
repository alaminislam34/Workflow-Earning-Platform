import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Aos from "aos";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";
import { AuthContext } from "../../../Auth/AuthContext";

const TaskListWorker = () => {
  const navigate = useNavigate();
  const { tasksData, isLoading, theme } = useContext(AuthContext);

  // Fetch tasks with pagination

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(tasksData?.length / itemsPerPage);

  const currentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return tasksData?.slice(startIndex, endIndex);
  }, [currentPage, tasksData]);

  // Handle Page Change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    Aos.init({
      once: true,
      offset: 300,
      duration: 2000,
      delay: 300,
    });
  }, [currentPageData, tasksData]);

  return (
    <div className="max-w-7xl mx-auto py-6">
      {/* Heading */}
      <DashboardTitle title={"Available Tasks"} />

      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div>
          {/* Task Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 text-sm">
            {currentPageData?.map((task) => (
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
                key={task._id}
                className={`card shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300 ${
                  theme === "light" ? "bg-white" : "bg-gray-800 text-white"
                }`}
              >
                {/* Image Section */}
                <div className="relative h-48">
                  <img
                    src={
                      task.task_image_url || "https://via.placeholder.com/300"
                    }
                    alt={task.task_title}
                    className="w-full h-full object-cover aspect-video"
                  />
                  {new Date(task.completion_date) < new Date() ||
                  task.required_workers <= 0 ? (
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-sm px-2 py-1 rounded-br-lg">
                      {new Date(task.completion_date) < new Date()
                        ? "Expired"
                        : task.required_workers <= 0
                        ? "Task Finished"
                        : ""}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col justify-between h-full">
                  <div>
                    {/* Task Title */}
                    <h2 className="text-xl font-bold text-primaryColor mb-3">
                      {task.task_title}
                    </h2>

                    {/* Buyer Name */}
                    <div className="grid grid-cols-5">
                      <p className="font-medium  text-sm col-span-3">Buyer:</p>
                      <p className="text-gray-500 mb-2 col-span-2">
                        {task.buyer_name}
                      </p>
                    </div>

                    {/* Completion Date */}
                    <div className="grid grid-cols-5">
                      <p className="font-medium  text-sm col-span-3">
                        Completion Date:
                      </p>
                      <p className="text-gray-500 mb-2 col-span-2">
                        <span
                          className={`${
                            new Date(task.completion_date) < new Date()
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          {new Date(task.completion_date).toLocaleDateString()}
                        </span>
                      </p>
                    </div>

                    {/* Payable Amount */}
                    <div className="grid grid-cols-5">
                      <p className="font-medium  text-sm col-span-3">
                        Payable Amount:
                      </p>
                      <p className="text-gray-500 mb-2 col-span-2">
                        ${task.payable_amount}
                      </p>
                    </div>

                    {/* Required Workers */}
                    <div className="grid grid-cols-5">
                      <p className="font-medium  text-sm col-span-3">
                        Required Workers:
                      </p>
                      <p
                        className={` mb-4 col-span-2 ${
                          task.required_workers <= 0
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {task.required_workers}
                      </p>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    disabled={
                      new Date(task.completion_date) < new Date() ||
                      task.required_workers <= 0
                    }
                    className={`w-full text-white bg-btnColor hover:bg-primaryColor btn cursor-pointer ${
                      new Date(task.completion_date) < new Date() ||
                      task.required_workers <= 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-primaryColor to-orange-500 hover:from-orange-600 hover:to-primaryColor"
                    }`}
                    onClick={() =>
                      navigate(`/dashboard/taskDetails/${task._id}`)
                    }
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            className="flex justify-center mt-4 p4"
          >
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
              {[...Array(totalPages)]?.map((_, index) => (
                <li key={index}>
                  <button
                    className={`rounded-lg shadow-xl btn btn-sm hover:bg-primaryColor ${
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

              {/* Next Button */}
              <li>
                <button
                  className={`rounded-lg shadow-xl btn btn-sm hover:bg-primaryColor ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() =>
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                >
                  <MdChevronRight />
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskListWorker;
