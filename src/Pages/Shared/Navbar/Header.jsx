import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../Auth/AuthContext";
import { ToastContainer } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { ImCoinDollar } from "react-icons/im";
import Aos from "aos";
import "aos/dist/aos.css";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { CiCircleQuestion, CiGrid31, CiUser } from "react-icons/ci";
import { FaUsersGear } from "react-icons/fa6";
import { GoTasklist } from "react-icons/go";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, currentUser, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    Aos.init({
      once: true,
      duration: 1500,
      delay: 300,
      offset: 200,
    });
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [currentUser, user, menuRef, setIsMenuOpen]);

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div
        data-aos="fade-right"
        data-aos-anchor-placement="center-bottom"
        className="max-w-7xl mx-auto px-4 lg:px-2 py-3 flex items-center justify-between relative"
      >
        {/* Website Logo */}
        <div
          onClick={() => {
            navigate("/");
          }}
          className="flex items-center cursor-pointer"
        >
          <h2 className="text-lg lg:text-2xl font-bold text-primaryColor">
            WorkFlow
          </h2>
        </div>

        <div className="hidden lg:flex items-center text-sm">
          {!user && (
            <>
              <NavLink to="/login" className="font-medium">
                Login
              </NavLink>

              <NavLink to="/register" className="font-medium">
                Register
              </NavLink>
              <NavLink
                to="help"
                className="flex items-center gap-2 font-medium"
              >
                <CiCircleQuestion className="text-lg" /> Help
              </NavLink>
              <a
                href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-alaminislam34"
                style={{ color: "#ffffff", transitionDuration: "0.2s" }}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 bg-btnColor text-white rounded-md hover:bg-primaryColor ml-2"
              >
                Join as Dev.
              </a>
            </>
          )}

          {user && (
            <>
              <NavLink
                to="dashboard/profileInfo"
                className="flex items-center hover:text-primaryColor text-gray-600 font-medium gap-2 py-2 "
              >
                <CiUser className="text-lg" /> Profile
              </NavLink>
              <NavLink
                to="help"
                className="flex items-center gap-2 hover:text-primaryColor text-gray-600"
              >
                <CiCircleQuestion className="text-lg" /> Help
              </NavLink>
              <NavLink
                to={
                  currentUser?.role === "Admin"
                    ? "dashboard/manageUsers"
                    : currentUser?.role === "Worker"
                    ? "dashboard/taskList"
                    : "dashboard/addTask"
                }
                className="flex items-center font-medium hover:text-primaryColor py-2  text-gray-600 gap-2"
              >
                {currentUser?.role === "Admin" ? (
                  <span className="flex items-center gap-2">
                    <FaUsersGear className="text-lg" /> {"Manage Users"}
                  </span>
                ) : currentUser?.role === "Worker" ? (
                  <span className="flex items-center gap-2">
                    <CiGrid31 className="text-lg" /> {"Task List"}
                  </span>
                ) : currentUser?.role === "Buyer" ? (
                  <span className="flex items-center gap-2">
                    <GoTasklist className="text-lg" /> {"Add New Tasks"}
                  </span>
                ) : (
                  ""
                )}
              </NavLink>
              <NavLink
                to={`/dashboard/${currentUser?.role}`}
                className="hover:text-primaryColor text-gray-600 font-medium py-2  flex items-center gap-2"
              >
                <CiGrid31 className="text-lg" /> Dashboard
              </NavLink>

              <p className=" font-medium flex items-center gap-2 text-primaryColor pr-2">
                <ImCoinDollar />{" "}
                <span className="font-bold">
                  {currentUser?.coins ? currentUser?.coins : 0}
                </span>
              </p>

              <div className="flex items-center space-x-2 pr-2">
                {/* Profile & Logout */}
                <img
                  src={user?.photoURL}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 object-cover bg-center rounded-full border-2 border-primaryColor"
                />
                <button
                  onClick={handleLogout}
                  className="text-red-500 cursor-pointer font-semibold hover:text-red-600"
                >
                  <IoMdLogOut className="text-lg" />
                </button>
              </div>
              <a
                href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-alaminislam34"
                style={{ color: "#ffffff", transitionDuration: "0.2s" }}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 bg-btnColor text-white rounded-md hover:bg-primaryColor"
              >
                Join as Dev.
              </a>
            </>
          )}
        </div>

        <button
          className="lg:hidden text-xl md:text-2xl py-1 px-2 h-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <RxCross2 className="text-primaryColor font-bold" />
          ) : (
            <RiMenu3Fill className="text-primaryColor font-bold" />
          )}
        </button>
      </div>

      <div
        ref={menuRef}
        className={`bg-base-200 absolute duration-500 ${
          isMenuOpen
            ? " top-12 right-2 opacity-100"
            : "top-20 opacity-0 pointer-events-none right-2"
        } space-y-6 w-52 z-50 rounded-lg overflow-hidden shadow-xl`}
      >
        {/* For Not Logged in Users */}
        {!user && (
          <ul className="flex flex-col gap-3 justify-start">
            <li onClick={() => setIsMenuOpen(false)}>
              <NavLink
                to="/login"
                className="text-gray-600 font-medium py-2 rounded-md w-full inline-block"
              >
                Login
              </NavLink>
            </li>
            <li className="border-b-2 border-dashed"></li>
            <li onClick={() => setIsMenuOpen(false)}>
              <NavLink
                to="/register"
                className="text-gray-600 font-medium py-2 rounded-md w-full inline-block"
              >
                Register
              </NavLink>
            </li>
            <li className="border-b-2 border-dashed"></li>
            <li onClick={() => setIsMenuOpen(false)}>
              <a
                href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-alaminislam34"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md"
              >
                Join as Developer
              </a>
            </li>
          </ul>
        )}

        {/* For Logged in Users */}
        <div className={`${user ? "block" : "hidden"} `}>
          {/* Profile Section */}
          <div>
            <ul className="text-sm">
              <li className="p-4 flex justify-between flex-row">
                <div className="flex flex-col gap-2">
                  <img
                    src={currentUser?.photo}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-cover bg-center rounded-full border-2 border-primaryColor"
                  />
                </div>
                {/* Coins Section */}
                <p className="font-medium flex items-center gap-2 text-primaryColor">
                  <ImCoinDollar />
                  <span className="font-bold">
                    {currentUser?.coins ? currentUser?.coins : 0}
                  </span>
                </p>
              </li>
              <li>
                <NavLink
                  to="dashboard/profileInfo"
                  className="flex items-center hover:text-primaryColor text-gray-600 font-medium gap-2 py-2 px-2"
                >
                  <CiUser className="text-lg" /> Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={
                    currentUser?.role === "Admin"
                      ? "manageUsers"
                      : currentUser?.role === "Worker"
                      ? "taskList"
                      : "addTask"
                  }
                  className="flex items-center font-medium hover:text-primaryColor py-2 px-2 text-gray-600 gap-2"
                >
                  {currentUser?.role === "Admin" ? (
                    <span className="flex items-center gap-2">
                      <FaUsersGear className="text-lg" /> {"Manage Users"}
                    </span>
                  ) : currentUser?.role === "Worker" ? (
                    <span className="flex items-center gap-2">
                      <CiGrid31 className="text-lg" /> {"Task List"}
                    </span>
                  ) : currentUser?.role === "Buyer" ? (
                    <span className="flex items-center gap-2">
                      <GoTasklist className="text-lg" /> {"Add New Tasks"}
                    </span>
                  ) : (
                    ""
                  )}
                </NavLink>
              </li>
              <li>
                {/* Dashboard */}
                <NavLink
                  to={`/dashboard/${currentUser?.role}`}
                  className="text-gray-600 font-medium py-2 flex items-center gap-2 rounded-md"
                >
                  <CiGrid31 className="text-lg" /> Dashboard
                </NavLink>
              </li>
              <li className="w-full bg-red-100 hover:bg-red-200 py-2 px-3">
                {/* Profile & Logout */}

                <button
                  onClick={handleLogout}
                  className="bg-red-100 cursor-pointer hover:bg-red-200 flex items-center flex-row gap-2"
                >
                  <IoMdLogOut className="text-lg" /> Logout
                </button>
              </li>
              <li className="bg-primaryColor py-2">
                {/* Join as Developer */}
                <a
                  href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-alaminislam34"
                  style={{ transitionDuration: "0.2s" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                >
                  Join as Developer
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        position="top-center"
      />
    </nav>
  );
};

export default Header;
