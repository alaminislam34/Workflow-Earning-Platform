import { RiMenu4Line } from "react-icons/ri";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../Auth/AuthContext";
import {
  IoIosHelpCircleOutline,
  IoIosLogOut,
  IoIosNotificationsOutline,
} from "react-icons/io";
import { FaCoins } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../Axios/useAxiosSecure";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { CiDark, CiUser } from "react-icons/ci";
import { PiCoins } from "react-icons/pi";
import { FiArrowRight } from "react-icons/fi";
import DropdownSidebar from "../../../Components/DropdownSidebar/DropdownSidebar";
import { GoHome } from "react-icons/go";
import { BiMessageRounded } from "react-icons/bi";

const DashboardNavbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [show, setShow] = useState(false);
  const { currentUser, setNavOpen, navOpen, review, handleLogout } =
    useContext(AuthContext);
  console.log(review);
  // console.log(currentUser);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("navOpen", JSON.stringify(navOpen));
  }, [navOpen]);

  const toggleNav = () => {
    setNavOpen((prev) => !prev);
  };
  const handleClose = () => setOpen(false);

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

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <div className="bg-white shadow-md lg:mx-4 rounded-lg">
      <div
        data-aos="fade-right"
        data-aos-anchor-placement="center-bottom"
        className="flex justify-between items-center max-w-7xl mx-auto p-2 relative"
      >
        {/* navbar Toggle Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenNavbar(true)}
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
          <div className="items-center cursor-pointer gap-2 hidden lg:flex  bg-[#FFEED5] p-2 rounded-full">
            {navOpen ? (
              <RiMenu4Line
                onClick={toggleNav}
                className="text-xl lg:text-2xl text-gray-500"
              />
            ) : (
              <FiArrowRight
                onClick={toggleNav}
                className="text-xl lg:text-2xl text-gray-500"
              />
            )}
          </div>
        </div>
        {/* Dashboard navbar */}
        <div>
          <button>
            <CiDark />
          </button>
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
            <label tabIndex={0} className="cursor-pointer">
              <img
                onClick={() => setOpen(!open)}
                className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full border-2 border-primaryColor "
                src={currentUser?.photo}
                alt="user"
                referrerPolicy="no-referrer"
              />
            </label>
            <div
              className={`w-44 absolute transition-all ease-in-out duration-200 ${
                open
                  ? "top-[50px] opacity-100"
                  : "opacity-0 top-16 pointer-events-none"
              } right-0 bg-white shadow-xl rounded-lg`}
            >
              <ul className="text-sm text-gray-600 font-medium">
                <li onClick={() => setOpen(false)} className="pb-2">
                  <p className="flex items-center justify-between gap-2 px-3 py-2">
                    <span> Coins: </span>
                    <span className="flex items-center gap-1">
                      {currentUser?.coins ? currentUser.coins : 0}{" "}
                      <PiCoins className="text-lg" />
                    </span>
                  </p>
                </li>
                <li className="hover:bg-base-300">
                  <NavLink to="/" className="flex items-center gap-2">
                    <GoHome className="text-lg" /> Home
                  </NavLink>
                </li>
                <li
                  onClick={() => setOpen(false)}
                  className="hover:bg-base-300"
                >
                  <NavLink to="profileInfo" className="flex items-center gap-2">
                    <CiUser className="text-lg" /> Profile
                  </NavLink>
                </li>
                <li
                  onClick={() => setOpen(false)}
                  className="hover:bg-base-300"
                >
                  <NavLink to="help" className="flex items-center gap-2">
                    <IoIosHelpCircleOutline className="text-lg" /> Help
                  </NavLink>
                </li>
                <li
                  onClick={() => setOpen(false)}
                  className="hover:bg-base-300"
                >
                  <NavLink to="support" className="flex items-center gap-2">
                    <BiMessageRounded />
                    Support
                  </NavLink>
                </li>

                <li
                  onClick={handleClose}
                  className="bg-red-100 hover:bg-red-200"
                >
                  <button
                    onClick={() => {
                      handleLogout();
                      navigate("/");
                    }}
                    className="flex items-center gap-2 text-red-600 cursor-pointer px-3 py-2 w-full"
                  >
                    <IoIosLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Notification Icon */}
          <div className="relative">
            <button
              onClick={() => {
                setShow(!show);
                setOpen(false);
              }}
              className="flex justify-center items-center"
            >
              <IoIosNotificationsOutline className="text-xl cursor-pointer md:text-2xl text-gray-600 hover:text-primaryColor transition-colors duration-300" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {currentUser?.role === "Worker"
                  ? notification?.length
                  : currentUser?.role === "Buyer"
                  ? review?.length
                  : 0}
              </span>
            </button>
            <div
              ref={dropdownRef}
              className={`absolute transition-all ease-in-out duration-200 ${
                show
                  ? "top-12 right-0 opacity-100"
                  : "top-16 right-0 pointer-events-none opacity-0"
              } shadow-xl bg-white rounded-lg w-64`}
            >
              <div>
                <div className="flex justify-between items-center px-4 py-2 bg-base-200">
                  {/* if there is a button in div, it will close the modal */}
                  <h3 className="font-medium text-sm lg:text-base text-center my-2">
                    Notifications!
                  </h3>
                  <button
                    onClick={() => setShow(false)}
                    className="text-lg cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  {isLoading ? (
                    <div className="w-full h-full flex justify-center items-center">
                      <span className="loading loading-dots loading-md"></span>
                    </div>
                  ) : (
                    // Notifications List
                    <div className="">
                      {currentUser?.role === "Buyer" ? (
                        <ul className="space-y-2 overflow-y-auto max-h-[200px]">
                          {review.map((r) => (
                            <li
                              onClick={() => navigate("Buyer")}
                              key={r._id}
                              className="list-item list-decimal list-inside text-xs lg:text-sm bg-base-200 text-gray-500 p-2 cursor-pointer"
                            >
                              <i>{r.worker_name || "Anonymous"}</i> submitted a
                              task. Click to review.
                            </li>
                          ))}
                        </ul>
                      ) : currentUser?.role === "Worker" &&
                        notification?.length > 0 ? (
                        <ul className="flex flex-col gap-2">
                          {notification?.map((m) => (
                            <li
                              key={m._id}
                              className={`p-4 rounded-lg flex items-start gap-2 ${
                                m.message.includes("rejected")
                                  ? "bg-red-50 border-red-200"
                                  : "bg-base-200 border-green-200"
                              }`}
                            >
                              <div
                                className={`text-3xl ${
                                  m.message.includes("rejected")
                                    ? "text-red-400"
                                    : "text-green-400"
                                }`}
                              >
                                {m.message.includes("rejected") ? (
                                  <MdOutlineCancel />
                                ) : (
                                  <IoCheckmarkDoneCircleSharp />
                                )}
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="text-xs lg:text-sm text-gray-500">
                                  {new Date(m.time).toLocaleString()}
                                </div>
                                <div className="text-xs lg:text-sm text-gray-800">
                                  {m.message}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-center text-xs py-2">
                          No Notifications
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed transition-all duration-500 ease-in-out px-4 ${
          openNavbar
            ? "top-0 left-0 opacity-100"
            : "top-0 -left-20 opacity-0 pointer-events-none"
        }  z-50 lg:hidden h-screen bg-white shadow-xl`}
      >
        <button
          onClick={() => setOpenNavbar(false)}
          className="btn btn-sm btn-circle absolute top-2 right-2"
        >
          X
        </button>
        <br />
        <DropdownSidebar setOpenNavbar={setOpenNavbar} />
      </div>
    </div>
  );
};

export default DashboardNavbar;
