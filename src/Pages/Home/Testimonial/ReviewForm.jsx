/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Rating from "react-rating";
import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { X } from "lucide-react";
import useAxiosPublic from "../../../Axios/useAxiosPublic";
import { toast } from "react-toastify";

const TestimonialForm = ({ setOpen }) => {
  const [starValue, setStarValue] = useState(0);
  const [uploadedImgUrl, setUploadedImgUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic;

  // ✅ Image Upload Handler
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await axiosPublic.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.secure_url) {
        setUploadedImgUrl(res.data.secure_url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed.");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Something went wrong during image upload.");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Submit Handler
  const onSubmit = async (data) => {
    console.log("testimonials upload");
    if (!uploadedImgUrl) {
      toast.error("Please upload an image before submitting.");
      return;
    }

    const reviewData = {
      name: data.name,
      rating: starValue,
      description: data.description,
      img: uploadedImgUrl,
    };

    try {
      const res = await axiosPublic.post("/postReview", reviewData);

      if (res.data.insertedId) {
        toast.success("Review submitted successfully!");
        reset();
        setStarValue(0);
        setUploadedImgUrl(null);
        setOpen(false);
      }
    } catch (error) {
      console.error("Review submission failed:", error);
      toast.error("Failed to submit review.");
    }
  };

  return (
    <div className="w-4/5 sm:w-2/5 md:w-1/3 mx-auto p-6 rounded-xl shadow-md relative bg-white text-black overflow-y-auto">
      <button
        onClick={() => setOpen(false)}
        className="absolute top-3 right-3 btn btn-sm"
      >
        <X />
      </button>
      <h2 className="text-2xl font-semibold text-center mb-6">
        Submit a Testimonial
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="mb-1 rounded-lg bg-primaryColor text-white p-2 cursor-pointer inline-block">
            Upload Your Image
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadImage}
              className="hidden"
            />
          </label>
          {uploading && <p className="text-sm text-yellow-500">Uploading...</p>}
          {!uploadedImgUrl && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
        </div>

        {/* Star Rating */}
        <div>
          <label className="block mb-1 font-medium">Rating</label>
          <Rating
            initialRating={starValue}
            onChange={(rate) => setStarValue(rate)}
            emptySymbol={<FaRegStar className="text-yellow-400 text-2xl" />}
            fullSymbol={<FaStar className="text-yellow-500 text-2xl" />}
          />
          {starValue === 0 && (
            <p className="text-red-500 text-sm mt-1">Rating is required</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Review</label>
          <textarea
            {...register("description", { required: "Review is required" })}
            className="w-full border border-gray-400 p-2 rounded-md"
            rows="4"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full btn btn-md bg-primaryColor hover:bg-btnColor text-white transition"
        >
          Submit Testimonial
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;
