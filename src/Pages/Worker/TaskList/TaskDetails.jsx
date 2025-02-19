import { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Auth/AuthContext";
import axiosInstance from "../../../Axios/useAxiosSecure";
import Swal from "sweetalert2";

const TaskDetails = () => {
  const { data } = useLoaderData();
  const { user, taskRefetch } = useContext(AuthContext);
  const [submissionDetails, setSubmissionDetails] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  console.log(data);
  return (
    <div className="md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-gradient-to-br from-orange-50 to-yellow-100">
        <div>
          <img src={data.task_image_url} alt="" />
        </div>
        {/* Task Details Section */}
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          className="p-4 lg:p-8 rounded-lg mb-8"
        >
          <h2 className="text-lg lg:text-xl font-semibold mb-6 text-orange-700 border-b border-gray-500 pb-2">
            Task Details
          </h2>
          <div className="space-y-2">
            <p className="text-sm lg:text-base flex *:flex-1">
              <p className="">Required Workers</p>
              <p className="text-gray-600 text-xs lg:text-sm">
                : {data.required_workers}
              </p>
            </p>
            <p className="text-sm lg:text-base flex *:flex-1">
              <p className="">Task Title</p>
              <p className="text-gray-600 text-xs lg:text-sm">
                : {data.task_title}
              </p>
            </p>
            <p className="text-sm lg:text-base flex *:flex-1">
              <p className="">Payable Amount</p>

              <p className="text-gray-600 text-xs lg:text-sm">
                : {data.payable_amount}
              </p>
            </p>
            <p className="text-sm lg:text-base flex *:flex-1">
              <p className="">Buyer Name</p>
              <p className="text-gray-600 text-xs lg:text-sm">
                : {data.buyer_name}
              </p>
            </p>
            <p className="text-sm lg:text-base flex *:flex-1">
              <p className="">Buyer Email</p>
              <p className="text-gray-600 text-xs lg:text-sm">
                : {data.buyer_email}
              </p>
            </p>
          </div>
        </div>
        <div className="lg:col-span-2 p-2 lg:p-4">
          <p className="text-sm lg:text-base text-gray-700">
            <p className="">Description</p>{" "}
            <p className="text-gray-600 text-xs lg:text-sm">
              {data.task_detail || "No description available."}
            </p>
          </p>
        </div>
      </div>

      {/* Submission Form Section */}
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="bg-white p-4 lg:p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 pb-2">
          Submit Your Work
        </h2>
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
              rows="6"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300"
              value={submissionDetails}
              onChange={(e) => setSubmissionDetails(e.target.value)}
              placeholder="Describe your work..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 cursor-pointer bg-orange-500 text-white text-sm lg:text-base font-semibold rounded-lg hover:bg-orange-600 transition-all"
          >
            Submit Work
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;
