import { useForm } from "react-hook-form";

const Support = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Your message has been sent successfully!");
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">New Message</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <input
          type="email"
          placeholder="Example@email.com"
          {...register("email", { required: "Email is required" })}
          className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primaryColor"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Subject Field */}
        <input
          type="text"
          placeholder="Your subject"
          {...register("subject", { required: "Subject is required" })}
          className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primaryColor"
        />
        {errors.subject && (
          <p className="text-red-500 text-sm">{errors.subject.message}</p>
        )}

        {/* Message Field */}
        <textarea
          rows="4"
          placeholder="Write your message..."
          {...register("message", { required: "Message cannot be empty" })}
          className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primaryColor"
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message.message}</p>
        )}

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
            onClick={() => reset()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primaryColor text-white rounded-md hover:bg-opacity-90"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Support;
