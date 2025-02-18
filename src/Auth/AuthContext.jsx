import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import useAxiosPublic from "../Axios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Axios/useAxiosSecure";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const Auth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [coin, setCoin] = useState(0);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [withdrawal, setWithdrawal] = useState([]);
  const axiosPublic = useAxiosPublic();
  const [navOpen, setNavOpen] = useState(
    () => JSON.parse(localStorage.getItem("navOpen")) ?? true
  );
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        try {
          const res = await axiosPublic.post("/jwt", {
            email: currentUser.email,
          });
          if (res.data.success) {
            localStorage.setItem("token", res.data.token);
          }
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      } else {
        setUser(null);
        setLoading(false);
        localStorage.removeItem("token");
      }
    });

    return () => unsubscribe();
  }, [axiosPublic, role]);

  const { data, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance("/allUsers");
      return res.data;
    },
    enabled: !!user,
  });

  const {
    data: currentUser,
    isLoading: currentUserLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosInstance(`/users?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  console.log(user);

  const info = {
    user,
    data,
    currentUserLoading,
    currentUser,
    usersLoading,
    loading,
    setLoading,
    coin,
    setCoin,
    setRole,
    refetch,
    navOpen,
    setNavOpen,
    setWithdrawal,
    withdrawal,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default Auth;
