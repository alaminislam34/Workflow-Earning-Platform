import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Axios/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import axiosInstance from "../Axios/useAxiosSecure";

const useAuth = () => {
  const { setLoading, refetch } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Handle user sign-in with Google
  const handleGoogleSignUp = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (res) => {
        const user = res.user;
        const postUser = {
          name: user?.displayName,
          email: user.email,
          photo: user.photoURL,
          role: "Worker",
        };

        const { data: exists } = await axiosInstance(
          `/users?email=${user?.email}`
        );
        if (exists) {
          navigate(`/dashboard/${exists?.role}`);
        } else {
          const response = await axiosPublic.post("/user", postUser);
          refetch();
          if (response.data.insertedId) {
            navigate(`/dashboard/Worker`);
          } else {
            navigate("/");
          }
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleGoogleSignUp };
};

export default useAuth;
