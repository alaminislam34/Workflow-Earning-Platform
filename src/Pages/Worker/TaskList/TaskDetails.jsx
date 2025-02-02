import { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Auth/AuthContext";
import axiosInstance from "../../../Axios/useAxiosSecure";
import Swal from "sweetalert2";

const TaskDetails = () => {
  const { data } = useLoaderData();
  const { user } = useContext(AuthContext);
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
      {/* Task Details Section */}
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="bg-gradient-to-br from-orange-50 to-yellow-100 p-4 lg:p-8 rounded-lg shadow-lg mb-8"
      >
        <h2 className="text-3xl font-bold mb-6 text-orange-700 border-b-2 pb-2">
          Task Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <p className="text-lg">
            <strong className="text-orange-600">Required Workers:</strong>{" "}
            {data.required_workers}
          </p>
          <p className="text-lg">
            <strong className="text-orange-600">Task Title:</strong>{" "}
            {data.task_title}
          </p>
          <p className="text-lg">
            <strong className="text-orange-600">Payable Amount:</strong> ${" "}
            {data.payable_amount}
          </p>
          <p className="text-lg">
            <strong className="text-orange-600">Buyer Name:</strong>{" "}
            {data.buyer_name}
          </p>
          <p className="text-lg">
            <strong className="text-orange-600">Buyer Email:</strong>{" "}
            {data.buyer_email}
          </p>
        </div>
        <p className="mt-6 text-lg text-gray-700">
          <strong className="text-orange-600">Description:</strong>{" "}
          {data.task_detail || "No description available."}
        </p>
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
              className="block text-lg font-medium text-gray-700 mb-2"
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
            className="w-full py-3 bg-orange-600 text-white text-lg font-semibold rounded-lg hover:bg-orange-700 transition-all"
          >
            Submit Work
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;
