import { RiMenu4Line } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Auth/AuthContext";
import {
  IoIosHelpCircleOutline,
  IoIosLogOut,
  IoIosNotificationsOutline,
} from "react-icons/io";
import WorkerSidebar from "../../Worker/Sidebar/WorkerSidebar";
import AdminSidebar from "../../Admin/Sidebar/AdminSidebar";
import BuyerSidebar from "../../Buyer/Sidebar/BuyerSidebar";
import { FaCoins, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../Axios/useAxiosSecure";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { PiCoins } from "react-icons/pi";

const DashboardNavbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const { currentUser, setNavOpen, navOpen } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("navOpen", JSON.stringify(navOpen));
  }, [navOpen]);

  // navOpen টগল করার ফাংশন
  const toggleNav = () => {
    setNavOpen((prev) => !prev);
  };

  const { data: notification, isLoading } = useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const res = await axiosInstance(
        `/notifications?email=${currentUser?.email}`
      );
      return res.data;
    },
    enabled: !!currentUser?.role === "Worker" && !!currentUser?.email,
  });

  return (
    <div className="bg-white shadow-md mx-2 px-2">
      <div
        data-aos="fade-right"
        data-aos-anchor-placement="center-bottom"
        className="flex justify-between items-center max-w-7xl mx-auto p-2 relative"
      >
        {/* navbar Toggle Button */}
        <div className="flex items-center gap-2 ">
          <button
            onClick={() => setOpenNavbar(!openNavbar)}
            className={`flex flex-col justify-between h-7 p-1 overflow-hidden pr-2 lg:hidden`}
          >
            <div
              className={`w-7 h-0.5 bg-primaryColor duration-500 ${
                openNavbar ? "rotate-45 translate-y-[9px]" : ""
              }`}
            />
            <div className="relative">
              <div
                className={`w-7 h-0.5 bg-primaryColor duration-300 absolute top-0 -translate-y-1/2 ${
                  openNavbar ? "-left-10" : "left-0"
                }`}
              ></div>
            </div>
            <div
              className={`w-7 h-0.5 bg-primaryColor duration-500 ${
                openNavbar ? "-rotate-45 -translate-y-[9px]" : ""
              }`}
            />
          </button>
          <div className="flex items-center cursor-pointer gap-2">
            <RiMenu4Line
              onClick={toggleNav}
              className="text-xl lg:text-2xl text-gray-500"
            />
          </div>
        </div>
        {/* Dashboard navbar */}
        <div
          className={`absolute duration-1000 lg:hidden ${
            openNavbar ? "left-0 top-0 w-4/4" : "-left-64 top-0"
          }`}
        >
          <ul className="p-4 w-3/5 sm:w-1/2 bg-primaryColor min-h-screen text-base-content flex flex-col justify-between">
            <div className="relative">
              <div className="absolute right-0 z-20 top-0 flex items-center gap-2 ">
                <button
                  onClick={() => setOpenNavbar(!openNavbar)}
                  className={`flex flex-col justify-between h-7 p-1 overflow-hidden lg:hidden`}
                >
                  <div
                    className={`w-7 h-0.5 bg-white duration-500 ${
                      openNavbar ? "rotate-45 translate-y-[9px]" : ""
                    }`}
                  />
                  <div className="relative">
                    <div
                      className={`w-6 h-1 bg-white duration-300 absolute top-0 -translate-y-1/2 ${
                        openNavbar ? "-left-10" : "left-0"
                      }`}
                    ></div>
                  </div>
                  <div
                    className={`w-7 h-0.5 bg-white duration-500 ${
                      openNavbar ? "-rotate-45 -translate-y-[9px]" : ""
                    }`}
                  />
                </button>
              </div>
              {/* Sidebar Content */}
              {currentUser?.role === "Worker" && <WorkerSidebar />}
              {currentUser?.role === "Admin" && <AdminSidebar />}
              {currentUser?.role === "Buyer" && <BuyerSidebar />}
            </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-row gap-6 text-gray-400 hover:text-white text-xl *:cursor-pointer ">
                <FaFacebook />
                <FaWhatsapp />
                <FaInstagram />
              </div>
            </div>
          </ul>
        </div>

        {/* User Info and Notifications */}
        <div className="flex items-center gap-1.5 md:gap-4 lg:gap-3">
          <div className="text-right">
            <p className="text-right gap-2 text-primaryColor mr-2">
              <span className=" font-medium flex justify-end items-center text-sm md:text-base gap-2">
                <span> {currentUser?.coins ? currentUser.coins : 0}</span>
                <FaCoins />
              </span>
            </p>
          </div>

          {/* User Profile */}
          <div className="relative">
            <label tabIndex={0} className="cursor-pointer ">
              <img
                onClick={() => setOpen(!open)}
                className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full border-2 border-primaryColor "
                src={currentUser?.photo}
                alt="user"
                referrerPolicy="no-referrer"
              />
            </label>
            <div
              className={`w-44 absolute duration-300 ${
                open ? "top-[50px] opacity-100" : "opacity-0 top-16"
              } right-0 bg-white shadow-xl rounded-lg`}
            >
              <ul className="text-sm text-gray-600 font-medium">
                <li onClick={() => setOpen(!open)}>
                  <NavLink to="withDrawal" className="flex items-center gap-2">
                    <PiCoins /> Coins: {currentUser?.coins}
                  </NavLink>
                </li>
                <li onClick={() => setOpen(!open)}>
                  <NavLink to="profileInfo" className="flex items-center gap-2">
                    <CiUser /> Profile
                  </NavLink>
                </li>
                <li onClick={() => setOpen(!open)}>
                  <NavLink to="profileInfo" className="flex items-center gap-2">
                    <IoIosHelpCircleOutline /> Help
                  </NavLink>
                </li>
                <li
                  onClick={() => setOpen(!open)}
                  className="bg-red-100 hover:bg-red-200"
                >
                  <NavLink to="profileInfo" className="flex items-center gap-2">
                    <IoIosLogOut /> Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Notification Icon */}
          <div
            onClick={() => {
              currentUser?.role === "Worker"
                ? document.getElementById("my_modal_3").showModal()
                : "";
            }}
            className="relative cursor-pointer"
          >
            <IoIosNotificationsOutline className="text-xl md:text-2xl text-gray-600 hover:text-primaryColor transition-colors duration-300" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {currentUser?.role === "Worker" ? notification?.length : 0}
            </span>
            {currentUser?.role === "Worker" ? (
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg text-center my-2">
                    Notifications!
                  </h3>
                  <div>
                    {isLoading ? (
                      <div className="w-full h-full flex justify-center items-center">
                        <span className="loading loading-dots loading-md"></span>
                      </div>
                    ) : (
                      <div>
                        {notification?.length > 0 ? (
                          <ul className="flex flex-col gap-4">
                            {notification?.map((m) => (
                              <li
                                key={m._id}
                                className={`p-4 rounded-lg shadow-md flex items-start gap-4 border ${
                                  m.message.includes("rejected")
                                    ? "bg-red-50 border-red-200"
                                    : "bg-green-50 border-green-200"
                                }`}
                              >
                                <div
                                  className={`text-3xl ${
                                    m.message.includes("rejected")
                                      ? "text-red-500"
                                      : "text-green-500"
                                  }`}
                                >
                                  {m.message.includes("rejected") ? (
                                    <MdOutlineCancel />
                                  ) : (
                                    <IoCheckmarkDoneCircleSharp />
                                  )}
                                </div>
                                <div className="flex-1 space-y-2">
                                  <div className="text-sm text-gray-500">
                                    {new Date(m.time).toLocaleString()}
                                  </div>
                                  <div className="text-sm md:text-base text-gray-800">
                                    {m.message}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No Notifications</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </dialog>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
