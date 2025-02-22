import { useContext } from "react";
import { AuthContext } from "../../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Tasks = () => {
  const { tasksData, isLoading, theme } = useContext(AuthContext);
  const navigate = useNavigate();
  const topPriceTask = tasksData
    ?.slice()
    .sort((a, b) => b.payable_amount - a.payable_amount);

  const topCompletedTasks = topPriceTask?.filter(
    (task) => new Date(task.completion_date) > new Date()
  );

  return (
    <div>
      <SectionTitle
        Title={"Our Top Paid Tasks"}
        description={
          "Discover high-paying micro-tasks and maximize your earnings effortlessly!"
        }
      />
      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div>
          {/* Task Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 text-sm">
            {topCompletedTasks?.slice(0, 8).map((task) => (
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
                key={task._id}
                className={`card shadow-lg rounded-lg overflow-hidden hover:shadow-2xl duration-300 ${
                  theme === "light" ? "bg-white" : "bg-gray-800 text-gray-100"
                }`}
              >
                {/* Image Section */}
                <div className="relative h-48 ">
                  <img
                    src={
                      task.task_image_url || "https://via.placeholder.com/300"
                    }
                    alt={task.task_title}
                    className="w-full h-full object-cover aspect-video"
                  />
                  {new Date(task.completion_date) < new Date() ||
                  task.required_workers <= 0 ? (
                    <div className="absolute top-0 left-0 bg-red-500  text-sm px-2 py-1 rounded-br-lg">
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
                    <h2 className="lg:text-lg font-semibold text-primaryColor mb-3">
                      {task.task_title}
                    </h2>

                    {/* Buyer Name */}
                    <div className="flex *:flex-1 items-center text-[12px]">
                      <p className="">Buyer</p>
                      <p className="">: {task.buyer_name}</p>
                    </div>

                    {/* Completion Date */}
                    <div className="flex *:flex-1 items-center text-[12px]">
                      <p className="">Completion Date</p>
                      <p className="">
                        <span
                          className={`${
                            new Date(task.completion_date) < new Date()
                              ? "text-red-500"
                              : ""
                          }`}
                        >
                          :{" "}
                          {new Date(task.completion_date).toLocaleDateString()}
                        </span>
                      </p>
                    </div>

                    {/* Payable Amount */}
                    <div className="flex *:flex-1 items-center text-[12px]">
                      <p className=" ">Payable Amount</p>
                      <p className="">: {task.payable_amount} $</p>
                    </div>

                    {/* Required Workers */}
                    <div className="flex *:flex-1 items-center text-[12px]">
                      <p className=" ">Required Workers</p>
                      <p
                        className={`${
                          task.required_workers <= 0 ? "text-red-500" : ""
                        }`}
                      >
                        : {task.required_workers}
                      </p>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    disabled={
                      new Date(task.completion_date) < new Date() ||
                      task.required_workers <= 0
                    }
                    className={`w-full  bg-btnColor hover:bg-primaryColor btn ${
                      new Date(task.completion_date) < new Date() ||
                      task.required_workers <= 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-primaryColor to-orange-500 hover:from-orange-600 hover:to-primaryColor"
                    }`}
                    onClick={() => navigate(`/taskDetailsPage/${task._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
