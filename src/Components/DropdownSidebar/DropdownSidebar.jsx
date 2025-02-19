/* eslint-disable react/prop-types */
import { CiBookmarkRemove, CiGrid31, CiUser } from "react-icons/ci";
import { GoHistory, GoHome, GoTasklist } from "react-icons/go";
import { PiHandWithdrawThin } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import WorkerProfile from "../../Pages/Worker/Profile/WorkerProfile";
import { AuthContext } from "../../Auth/AuthContext";
import { useContext } from "react";
import { MdAddTask } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { BiPurchaseTag } from "react-icons/bi";
import { BsCoin } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const DropdownSidebar = ({ setOpenNavbar }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="flex flex-col justify-between">
      <ul className={`flex flex-col gap-1 text-xs md:text-sm text-gray-500 `}>
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-anchor-placement="center-bottom"
          className={`flex flex-col items-center w-full justify-center mt-6`}
        >
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <BsCoin className="text-lg lg:text-xl" />

            <h2 className="text-lg lg:text-xl font-bold text-primaryColor">
              WorkFlow
            </h2>
          </div>
          {<WorkerProfile />}
        </div>
        <li
          onClick={() => setOpenNavbar(false)}
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-anchor-placement="center-bottom"
        >
          <NavLink
            to={currentUser?.role}
            className="flex items-center font-medium hover:font-semibold duration-300 gap-2"
          >
            <GoHome className="text-lg lg:text-xl" /> {"Dashboard"}
          </NavLink>
        </li>
        <li
          onClick={() => setOpenNavbar(false)}
          data-aos="fade-up"
          data-aos-delay="600"
          data-aos-anchor-placement="center-bottom"
        >
          <NavLink
            to="profileInfo"
            className="flex items-center font-medium hover:font-semibold duration-300 gap-2"
          >
            <CiUser className="text-lg lg:text-xl" /> {"Profile"}
          </NavLink>
        </li>
        <li
          onClick={() => setOpenNavbar(false)}
          data-aos="fade-up"
          data-aos-delay="800"
          data-aos-anchor-placement="center-bottom"
        >
          <NavLink
            to={
              currentUser?.role === "Admin"
                ? "manageUsers"
                : currentUser?.role === "Worker"
                ? "taskList"
                : "addTask"
            }
            className="flex items-center font-medium hover:font-semibold duration-300 gap-2"
          >
            {currentUser?.role === "Admin" ? (
              <span className="flex items-center gap-2">
                <FaUsersGear className="text-lg lg:text-xl" /> {"Manage Users"}
              </span>
            ) : currentUser?.role === "Worker" ? (
              <span className="flex items-center gap-2">
                <CiGrid31 className="text-lg lg:text-xl" /> {"Task List"}
              </span>
            ) : currentUser?.role === "Buyer" ? (
              <span className="flex items-center gap-2">
                <GoTasklist className="text-lg lg:text-xl" /> {"Add New Tasks"}
              </span>
            ) : (
              ""
            )}
          </NavLink>
        </li>
        <li
          onClick={() => setOpenNavbar(false)}
          data-aos="fade-up"
          data-aos-delay="1000"
          data-aos-anchor-placement="center-bottom"
        >
          <NavLink
            to={
              currentUser?.role === "Worker"
                ? "mySubmissions"
                : currentUser?.role === "Buyer"
                ? "myTask"
                : currentUser?.role === "Admin"
                ? "manageTasks"
                : ""
            }
            className="flex items-center font-medium hover:font-semibold duration-300 gap-2"
          >
            {currentUser?.role === "Worker" ? (
              <span className="flex items-center gap-2">
                <CiBookmarkRemove className="text-lg lg:text-xl" />{" "}
                {"My Submissions"}
              </span>
            ) : currentUser?.role === "Buyer" ? (
              <span className="flex items-center gap-2">
                <CiGrid31 className="text-lg lg:text-xl" /> {"My Task`s"}
              </span>
            ) : currentUser?.role === "Admin" ? (
              <span className="flex items-center gap-2">
                <MdAddTask className="text-lg lg:text-xl" /> {"Manage Tasks"}
              </span>
            ) : (
              ""
            )}
          </NavLink>
        </li>
        <li
          onClick={() => setOpenNavbar(false)}
          data-aos="fade-right"
          data-aos-delay="1200"
          data-aos-anchor-placement="center-bottom"
          className={`${currentUser?.role === "Admin" && "hidden"}`}
        >
          <NavLink
            to={
              currentUser?.role === "Worker"
                ? "withDrawal"
                : currentUser?.role == "Buyer"
                ? "purchase"
                : ""
            }
            className="flex items-center font-medium hover:font-semibold duration-300 gap-2"
          >
            {currentUser?.role === "Worker" ? (
              <span className="flex items-center gap-2">
                <PiHandWithdrawThin className="text-lg lg:text-xl" />
                {"Withdrawals"}
              </span>
            ) : currentUser?.role == "Buyer" ? (
              <span className="flex items-center gap-2">
                <BiPurchaseTag className="text-lg lg:text-xl" />{" "}
                {"Purchase Coins"}
              </span>
            ) : (
              ""
            )}
          </NavLink>
        </li>
        <li
          onClick={() => setOpenNavbar(false)}
          data-aos="fade-up"
          data-aos-delay="1400"
          data-aos-anchor-placement="center-bottom"
        >
          {currentUser?.role === "Buyer" && (
            <NavLink to="payment" className="flex items-center gap-2">
              <GoHistory className="text-lg lg:text-xl" /> {"Payment History"}
            </NavLink>
          )}
        </li>
      </ul>
      <div className="flex justify-center items-center gap-2 mt-8">
        <FaFacebook />
        <FaWhatsapp />
        <FaInstagram />
      </div>
    </div>
  );
};

export default DropdownSidebar;
