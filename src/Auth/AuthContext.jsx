import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import useAxiosPublic from "../Axios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Axios/useAxiosSecure";
import { toast } from "react-toastify";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const Auth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [coin, setCoin] = useState(0);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "night");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [withdrawal, setWithdrawal] = useState([]);
  const [review, setReview] = useState([]);
  const axiosPublic = useAxiosPublic();
  const [navOpen, setNavOpen] = useState(
    () => JSON.parse(localStorage.getItem("navOpen")) ?? true
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
  // task query
  const {
    data: tasksData,
    isLoading,
    refetch: taskRefetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/tasks`, {
        withCredentials: true,
      });
      return res.data;
    },
    keepPreviousData: true,
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

  // handle logout
  const handleLogout = () => {
    toast.dismiss();
    signOut(auth)
      .then(() => {
        toast.success("Sign out confirmed");
        localStorage.removeItem("token");
      })
      .catch((error) => {
        console.error("Sign out failed:", error.message);
        toast.error("Failed to sign out");
      });
  };

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
    review,
    setReview,
    handleLogout,
    tasksData,
    isLoading,
    taskRefetch,
    toggleTheme,
    theme,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default Auth;
