import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Auth/useAuth";
import { useContext, useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Lottie from "react-lottie";
import registerJSON from "../../assets/lottieFile/register.json";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../Axios/useAxiosPublic";
import { AuthContext } from "../../Auth/AuthContext";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { setLoading, refetch } = useContext(AuthContext);
  const { handleGoogleSignUp } = useAuth();
  const [passwordStrength, setPasswordStrength] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

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
      console.error("Image upload failed", error);
      Swal.fire("Error", "Image upload failed. Please try again.", "error");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Password strength checking function
  const checkPasswordStrength = (password) => {
    if (!password || password.length < 6) {
      setPasswordStrength("Password is required");
      return;
    }
    const strength = [
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[@$!%*?&#]/.test(password),
    ].filter(Boolean).length;

    if (strength <= 2) {
      setPasswordStrength("Weak");
    } else if (strength === 3) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
  };

  const onSubmit = async (data) => {
    const { name, email, password, role } = data;
    setLoading(true);
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      // Update user profile
      await updateProfile(user, {
        displayName: name,
        photoURL: uploadedImageUrl,
      });

      // Prepare user data
      const userData = {
        name: name,
        email: email,
        photo: uploadedImageUrl,
        role: role || "Worker",
      };
      const res = await axiosPublic.post("/user", userData);
      if (res.data.insertedId) {
        setTimeout(() => {
          setLoading(true);
        }, 2000);
        refetch();
        navigate(`/dashboard/${role ? role : "Worker"}`);
      }
      reset();
    } catch (error) {
      toast.error("Failed registration", error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center min-h-screen bg-gray-100 py-4">
      <Helmet>
        <title>Register || WorkFlow</title>
      </Helmet>
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="hidden md:flex justify-end items-center"
      >
        <div className="m-4 w-4/5">
          <Lottie options={{ animationData: registerJSON }}></Lottie>
        </div>
      </div>
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className=" m-4"
      >
        <div className="max-w-lg mx-auto bg-white shadow-xl p-4 md:p-6 lg:p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Create an account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/*  Name */}
            <div>
              <input
                required
                type="text"
                placeholder="Your Name"
                {...register("name", { required: "First name is required" })}
                className={`mt-1 block w-full focus:border-primaryColor focus:outline-none border-b-2 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Your Image Upload */}
            <div>
              <label htmlFor="task_image_url" className="block text-gray-400">
                Your Image
              </label>
              <input
                id="task_image_url"
                type="file"
                accept="image/*"
                className="w-full border border-gray-300 p-2 rounded"
                onChange={(e) => handleImageUpload(e.target.files[0])}
                required
              />
              {uploadedImageUrl && (
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded Task"
                  className="mt-2 w-24 h-24 object-cover rounded"
                />
              )}
            </div>

            {/* Email */}
            <div>
              <input
                required
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email",
                  },
                })}
                className={`mt-1 block w-full focus:border-primaryColor focus:outline-none border-b-2 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                required
                type={show ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                onChange={(e) => checkPasswordStrength(e.target.value)}
                className={`mt-1 block w-full focus:border-primaryColor focus:outline-none border-b-2 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500`}
              />{" "}
              <p
                onClick={() => setShow(!show)}
                className="absolute top-0 right-4 text-xl text-gray-400"
              >
                {show ? <FaEye /> : <IoMdEyeOff />}
              </p>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              {passwordStrength && (
                <p
                  className={`text-sm mt-1 ${
                    passwordStrength === "Strong"
                      ? "text-green-500"
                      : passwordStrength === "Medium"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {passwordStrength}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                required
                type={show ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className={`mt-1 block w-full focus:border-primaryColor focus:outline-none border-b-2 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500`}
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* role */}
            <div>
              <select
                defaultValue={"Select Role"}
                type="text"
                {...register("role", {
                  required: "Your role is required",
                })}
                className={`mt-1 block w-full focus:border-primaryColor focus:outline-none border-b-2 ${
                  errors.role ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500`}
              >
                <option defaultValue="Select Role" disabled>
                  Select Role
                </option>
                <option value="Worker">Worker</option>
                <option value="Buyer">Buyer</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-btnColor hover:bg-primaryColor text-white py-2 focus:border-primaryColor focus:outline-none transition"
            >
              Create an account
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primaryColor font-medium hover:underline"
            >
              Login
            </a>
          </p>
          <div className="divider">or</div>
          <div className="flex flex-col gap-2 items-center justify-center py-2">
            <button
              onClick={handleGoogleSignUp}
              className="w-full text-center py-2 text-sm px-12 md:px-16 flex justify-center hover:shadow-2xl hover:bg-bgColor duration-300 border rounded-full items-center relative"
            >
              <FcGoogle className="text-2xl absolute top-1/2 -translate-y-1/2 left-1 hover:shadow-xl" />
              Continue With Google
            </button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Register;
