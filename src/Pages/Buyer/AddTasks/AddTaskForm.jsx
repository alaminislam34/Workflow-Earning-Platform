import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Auth/AuthContext";
import useUpdateCoin from "../../../Hook/CoinUpdateHook/useUpdateCoin";
import axiosInstance from "../../../Axios/useAxiosSecure";
import Aos from "aos";

// eslint-disable-next-line react/prop-types
const AddTaskForm = ({ userCoins }) => {
  const { mutate } = useUpdateCoin();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const { user, refetch, theme } = useContext(AuthContext);

  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMG_API_KEY
        }`,
        formData
      );
      setUploadedImageUrl(response.data.data.display_url);
    } catch (error) {
      Swal.fire(
        "Error",
        "Image upload failed. Please try again.",
        error.message
      );
    }
  };

  const onSubmit = async (data) => {
    const {
      task_title,
      task_detail,
      required_workers,
      payable_amount,
      completion_date,
      submission_info,
    } = data;

    const totalPayableAmount = required_workers * payable_amount;

    if (totalPayableAmount > userCoins) {
      Swal.fire({
        title: "Insufficient Coins",
        text: "Not available Coin. Purchase Coin.",
        icon: "warning",
        confirmButtonColor: "#FF6F00",
        cancelButtonColor: "#179221",
        showCancelButton: true,
        confirmButtonText: "Purchase Coins",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/purchase");
        }
      });
      return;
    }

    const taskData = {
      task_title,
      task_image_url: uploadedImageUrl,
      task_detail,
      buyer_name: user?.displayName,
      buyer_email: user?.email,
      required_workers: parseInt(required_workers),
      payable_amount: parseInt(payable_amount),
      totalPayableAmount: parseInt(totalPayableAmount),
      completion_date,
      submission_info,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post("/tasks", taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const newCoin = userCoins - totalPayableAmount;
        mutate(
          { email: user?.email, newCoin },
          {
            onSuccess: (data) => {
              Swal.fire("Success", "Task added successfully!", "success");
              console.log(data);
            },
          }
        );
        // updateUserCoins(userCoins - totalPayableAmount);
        reset();
        refetch();
        setUploadedImageUrl("");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      Swal.fire("Error", "Failed to add the task. Please try again.", "error");
    }
  };
  useEffect(() => {
    Aos.init({
      once: true,
      offset: 300,
      duration: 2000,
      delay: 300,
    });
  }, [userCoins, user]);

  return (
    <form
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      onSubmit={handleSubmit(onSubmit)}
      className={`${
        theme === "light" ? "bg-white" : "bg-gray-800 text-white"
      } p-4 lg:p-6 lg:max-w-4xl mx-auto w-full border-t-4 border-primaryColor shadow-xl rounded-lg space-y-6`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {/* Task Title */}
        <div>
          <label
            htmlFor="task_title"
            className="block text-base lg:text-lg font-semibold "
          >
            Task Title
          </label>
          <input
            id="task_title"
            type="text"
            {...register("task_title", { required: true })}
            className="w-full mt-1 focus:outline-none px-2 border-base-300 rounded-md py-2"
            placeholder="Enter your task title"
          />
        </div>

        {/* Completion Date */}
        <div>
          <label
            htmlFor="completion_date"
            className="block text-base lg:text-lg font-semibold "
          >
            Completion Date
          </label>
          <input
            id="completion_date"
            type="date"
            {...register("completion_date", { required: true })}
            className="w-full mt-1 focus:outline-none px-2 border-base-300 rounded-md py-2"
          />
        </div>
      </div>

      {/* Task Detail */}
      <div>
        <label
          htmlFor="task_detail"
          className="block text-base lg:text-lg font-semibold "
        >
          Task Detail
        </label>
        <textarea
          id="task_detail"
          {...register("task_detail", { required: true })}
          className="w-full mt-1 focus:outline-none px-2 border-base-300 rounded-md p-2"
          placeholder="Detailed description of the task"
        />
      </div>

      {/* Required Workers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <div>
          <label
            htmlFor="required_workers"
            className="block text-base lg:text-lg font-semibold "
          >
            Required Workers
          </label>
          <input
            id="required_workers"
            type="number"
            {...register("required_workers", { required: true, min: 1 })}
            className="w-full mt-1 focus:outline-none px-2 border-base-300 rounded-md py-2"
            placeholder="e.g., 10"
          />
        </div>

        {/* Payable Amount */}
        <div>
          <label
            htmlFor="payable_amount"
            className="block text-base lg:text-lg font-semibold "
          >
            Payable Amount (Per Worker)
          </label>
          <input
            id="payable_amount"
            type="number"
            {...register("payable_amount", { required: true, min: 1 })}
            className="w-full mt-1 focus:outline-none px-2 border-base-300 rounded-md py-2"
            placeholder="e.g., 15"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {/* Submission Info */}
        <div>
          <label
            htmlFor="submission_info"
            className="block text-base lg:text-lg font-semibold "
          >
            Submission Info
          </label>
          <input
            id="submission_info"
            type="text"
            {...register("submission_info", { required: true })}
            className="w-full mt-1 focus:outline-none px-2 border-base-300 rounded-md py-2"
            placeholder="Screenshot or proof"
          />
        </div>

        {/* Task Image Upload */}
        <div>
          <label
            htmlFor="task_image_url"
            className="block text-base lg:text-lg font-semibold "
          >
            Task Image
          </label>
          <input
            id="task_image_url"
            type="file"
            accept="image/*"
            className="w-full mt-1 focus:outline-none px-2 border-base-300 rounded-md py-2"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            required
          />
          {uploadedImageUrl && (
            <img
              src={uploadedImageUrl}
              alt="Uploaded Task"
              className="mt-3 w-32 h-32 object-cover rounded-md border border-gray-200"
            />
          )}
        </div>
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full cursor-pointer bg-btnColor hover:bg-primaryColor text-white py-3 px-5 rounded-lg font-semibold shadow-md hover:shadow-lg duration-300"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
