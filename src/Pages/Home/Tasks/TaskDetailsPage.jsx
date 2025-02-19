import { useState, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Auth/AuthContext";
import axiosInstance from "../../../Axios/useAxiosSecure";
import Swal from "sweetalert2";

const TaskDetailsPage = () => {
  const { data } = useLoaderData();
  const { user, taskRefetch, currentUser } = useContext(AuthContext);
  const [submissionDetails, setSubmissionDetails] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the user is logged in
    if (!user) {
      return navigate("/login");
    }
    // Handle task submission
    const submissionData = {
      task_id: data._id,
      task_title: data.task_title,
      payable_amount: data.payable_amount,
      worker_email: user.email,
      worker_name: user.displayName,
      buyer_name: data.buyer_name,
      buyer_email: data.buyer_email,
      submission_details: submissionDetails,
      current_date: new Date().toISOString(),
      status: "pending",
    };

    if (data.required_workers > 0) {
      try {
        const response = await axiosInstance.post(
          "/submissions",
          submissionData
        );

        if (response.data.insertedId) {
          const remainingWorkers = data.required_workers - 1;
          await axiosInstance.patch(
            `/updateRequiredWorkers/${data?._id}`,
            { remainingWorkers },
            { withCredentials: true }
          );

          Swal.fire({
            title: "Successful",
            text: "Task Submission Successful",
            timer: 3000,
            icon: "success",
          });
          taskRefetch();
          setSubmissionDetails("");
        }
      } catch (error) {
        console.error("Error submitting the task:", error);
        Swal.fire({
          title: "Failed",
          text: "Task Submission Failed",
          timer: 3000,
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Oops",
        text: "The task is already complete, no more workers are required",
        timer: 3000,
        icon: "error",
      });
    }
  };

  return (
    <div className="md:p-6">
      <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold my-4 py-4">
        {data.task_title}
      </h2>
      <div>
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer py-2 px-4 rounded-lg bg-primaryColor text-white ml-4"
        >
          Back
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        <div>
          <img
            src={data?.task_image_url}
            alt="Task Image"
            className="object-cover bg-cover border h-full w-full border-gray-400 rounded-lg"
          />
        </div>
        {/* Task Details Section */}
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          className="rounded-lg mb-8"
        >
          <h2 className="text-lg lg:text-xl font-semibold mb-6 text-orange-700 border-b border-gray-500 pb-2">
            Task Details
          </h2>
          <div className="space-y-2">
            <p className="text-sm lg:text-base flex *:flex-1">
              <p className="">Required Workers</p>
              <p className="text-gray-500 text-xs lg:text-sm">
                : {data.required_workers}
              </p>
            </p>

            <p className="text-sm lg:text-base flex *:flex-1">
              <p className="">Payable Amount</p>

              <p className="text-gray-500 text-xs lg:text-sm">
                : {data.payable_amount} $
              </p>
            </p>
            <p className="text-sm lg:text-base flex *:flex-1">
              <p className="">Buyer Name</p>
              <p className="text-gray-500 text-xs lg:text-sm">
                : {data.buyer_name}
              </p>
            </p>
            <p className="text-sm lg:text-base flex *:flex-1">
              <p className="">Buyer Email</p>
              <p className="text-gray-500 text-xs lg:text-sm">
                : {data.buyer_email}
              </p>
            </p>
            <p className="text-sm lg:text-base  pt-2">
              <p className="font-medium">Description</p>{" "}
              <p className="text-gray-500 text-xs lg:text-sm">
                {data.task_detail || "No description available."}
              </p>
            </p>
            {/* Submission Form Section */}
            {currentUser?.role === "Worker" && (
              <div data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label
                      htmlFor="submissionDetails"
                      className="block text-sm lg:text-base font-medium text-gray-700 mb-2"
                    >
                      Submission Details
                    </label>
                    <textarea
                      id="submissionDetails"
                      name="submissionDetails"
                      rows="4"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300"
                      value={submissionDetails}
                      onChange={(e) => setSubmissionDetails(e.target.value)}
                      placeholder="Describe your work..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 cursor-pointer bg-primaryColor text-white text-sm lg:text-base font-semibold rounded-lg hover:bg-orange-600 transition-all"
                  >
                    Submit Work
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
