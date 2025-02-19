import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../../Firebase/firebase.config";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Lottie from "react-lottie";
import loginJSON from "../../assets/lottieFile/login.json";
import { Helmet } from "react-helmet";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import Swal from "sweetalert2";
import axiosInstance from "../../Axios/useAxiosSecure";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import Aos from "aos";

// Function to fetch the current user's data
const fetchUserData = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not logged in");
  }
  return {
    email: user.email,
    uid: user.uid,
  };
};

const Login = () => {
  const [show, setShow] = useState(false);
  const {
    setLoading,
    refetch: CurrentRefetch,
    theme,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { refetch, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
    enabled: false,
  });
  const onSubmit = async (data) => {
    const { email, password } = data;
    toast.dismiss();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      CurrentRefetch();
      refetch();
      Swal.fire({
        title: "Success!",
        text: "User login successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      const { data: exists } = await axiosInstance(`/users?email=${email}`);
      setLoading(false);
      console.log(exists?.role);
      if (exists) {
        navigate(`/dashboard/${exists?.role}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setLoading(false);
      Swal.fire({
        title: "Failed!",
        text: "Invalid username or password",
        icon: "error",
        confirmButtonColor: "#ff6f00",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Aos.init();
  }, [theme]);

  return (
    <div className="flex justify-center flex-col md:flex-row items-center min-h-[80vh] px-4">
      <Helmet>
        <title>Login page || WorkFlow</title>
      </Helmet>
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="hidden md:block"
      >
        <Lottie options={{ animationData: loginJSON }}></Lottie>
      </div>
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className={`${
          theme === "light" ? "bg-white" : "bg-gray-800 text-white"
        }shadow-xl rounded-lg p-8 w-full max-w-md`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="">
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
              className={`mt-1 block w-full border-b-2 focus:border-b-primaryColor py-2 px-4 rounded-md border-base-300 focus:outline-none ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
                className={`mt-1 block w-full border-b-2 pr-12 focus:border-b-primaryColor py-2 px-4 rounded-md border-base-300 focus:outline-none ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <p
                onClick={() => setShow(!show)}
                className="absolute top-1/2 -translate-y-1/2 right-4 text-xl text-gray-400 cursor-pointer"
              >
                {show ? <RxEyeOpen /> : <RxEyeClosed />}
              </p>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-btnColor hover:bg-primaryColor text-white py-2 focus:border-b-primaryColor border-base-300 focus:outline-none transition rounded-md cursor-pointer"
          >
            {isLoading ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-primaryColor text-xs lg:text-sm font-medium hover:underline"
          >
            Create one
          </a>
        </p>
      </div>
      <ToastContainer autoClose={3000} hideProgressBar={true} />
    </div>
  );
};

export default Login;
