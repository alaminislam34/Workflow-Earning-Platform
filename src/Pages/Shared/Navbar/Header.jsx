import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../Auth/AuthContext";
import { ToastContainer } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { ImCoinDollar } from "react-icons/im";
import Aos from "aos";
import "aos/dist/aos.css";
import { RiMenu3Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { CiDark, CiLight } from "react-icons/ci";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, currentUser, handleLogout, theme, toggleTheme } =
    useContext(AuthContext);
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
    <nav
      className={`shadow-md fixed top-0 w-full z-50 ${
        theme === "light" ? "bg-white" : "bg-gray-800 text-white"
      }`}
    >
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

        <div className="hidden lg:flex items-center space-x-2 text-sm">
          {!user && (
            <>
              <NavLink to="/" className="font-medium">
                Home
              </NavLink>

              <NavLink to="help" className=" font-medium">
                Help
              </NavLink>
              <NavLink to="blog" className="font-medium">
                Blog
              </NavLink>
              <NavLink to="/login" className="font-medium">
                Login
              </NavLink>
              <NavLink to="/register" className="font-medium">
                Register
              </NavLink>
              <button
                onClick={toggleTheme}
                className="cursor-pointer p-2 rounded-full"
              >
                {theme === "light" ? (
                  <CiDark className="text-xl" />
                ) : (
                  <CiLight className="text-xl" />
                )}
              </button>
              <a
                href="https://github.com/alaminislam34/Workflow-Earning-Platform"
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
              <NavLink to="/" className="font-medium hover:text-primaryColor ">
                Home
              </NavLink>

              <NavLink
                to="dashboard/profileInfo"
                className="flex items-center hover:text-primaryColor  font-medium gap-2 py-2 "
              >
                Profile
              </NavLink>
              <NavLink
                to="help"
                className="flex items-center gap-2 hover:text-primaryColor font-medium"
              >
                Help
              </NavLink>
              <NavLink
                to={
                  currentUser?.role === "Admin"
                    ? "dashboard/manageUsers"
                    : currentUser?.role === "Worker"
                    ? "dashboard/taskList"
                    : "dashboard/addTask"
                }
                className="flex items-center font-medium hover:text-primaryColor py-2   gap-2"
              >
                {currentUser?.role === "Admin" ? (
                  <span className="flex items-center gap-2">
                    {"Manage Users"}
                  </span>
                ) : currentUser?.role === "Worker" ? (
                  <span className="flex items-center gap-2">{"Task List"}</span>
                ) : currentUser?.role === "Buyer" ? (
                  <span className="flex items-center gap-2">
                    {"Add New Tasks"}
                  </span>
                ) : (
                  ""
                )}
              </NavLink>
              <NavLink
                to={`/dashboard/${currentUser?.role}`}
                className="hover:text-primaryColor  font-medium py-2  flex items-center gap-2"
              >
                Dashboard
              </NavLink>
              <button
                onClick={toggleTheme}
                className="cursor-pointer p-2 rounded-full"
              >
                {theme === "light" ? (
                  <CiDark className="text-xl" />
                ) : (
                  <CiLight className="text-xl" />
                )}
              </button>
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
                  <FiLogOut className="text-lg" />
                </button>
              </div>
              <a
                href="https://github.com/alaminislam34/Workflow-Earning-Platform"
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

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="cursor-pointer p-2 rounded-full"
          >
            {theme === "light" ? (
              <CiDark className="text-xl" />
            ) : (
              <CiLight className="text-xl" />
            )}
          </button>
          <button
            className=" text-xl md:text-2xl py-1 px-2 h-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <RxCross2 className="text-primaryColor font-bold" />
            ) : (
              <RiMenu3Fill className="text-primaryColor font-bold" />
            )}
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`bg-base-200 absolute duration-500 ${
          isMenuOpen
            ? " top-12 right-2 opacity-100"
            : "top-20 opacity-0 pointer-events-none right-2"
        } w-52 z-50 rounded-lg overflow-hidden shadow-2xl`}
      >
        {/* For Not Logged in Users */}
        {!user && (
          <ul className="p-2">
            <li className="py-2 hover:bg-base-300">
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                to="/"
                className=" font-medium w-full inline-block"
              >
                Home
              </NavLink>
            </li>
            <li className="py-2 hover:bg-base-300">
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                to="/login"
                className=" font-medium w-full inline-block"
              >
                Login
              </NavLink>
            </li>
            <li className="py-2 hover:bg-base-300">
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                to="/register"
                className=" font-medium w-full inline-block"
              >
                Register
              </NavLink>
            </li>

            <li className="py-2 hover:bg-base-300">
              <a
                onClick={() => setIsMenuOpen(false)}
                href="https://github.com/alaminislam34/Workflow-Earning-Platform"
                target="_blank"
                rel="noopener noreferrer"
                className=" w-full inline-block"
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
                  className="flex items-center hover:text-primaryColor  font-medium gap-2 py-2 px-2"
                >
                  Profile
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
                  className="flex items-center font-medium hover:text-primaryColor py-2 px-2  gap-2"
                >
                  {currentUser?.role === "Admin" ? (
                    <span className="flex items-center gap-2">
                      {"Manage Users"}
                    </span>
                  ) : currentUser?.role === "Worker" ? (
                    <span className="flex items-center gap-2">
                      {"Task List"}
                    </span>
                  ) : currentUser?.role === "Buyer" ? (
                    <span className="flex items-center gap-2">
                      {"Add New Tasks"}
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
                  className=" font-medium py-2 flex items-center gap-2 rounded-md"
                >
                  Dashboard
                </NavLink>
              </li>

              <li className="w-full bg-red-100 hover:bg-red-200 py-2 px-3">
                {/* Profile & Logout */}

                <button
                  onClick={handleLogout}
                  className="bg-red-100 cursor-pointer hover:bg-red-200 flex items-center flex-row gap-2"
                >
                  <FiLogOut /> Logout
                </button>
              </li>
              <li className="bg-primaryColor py-2">
                {/* Join as Developer */}
                <a
                  href="https://github.com/alaminislam34/Workflow-Earning-Platform"
                  style={{ transitionDuration: "0.2s" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                >
                  Join as Dev.
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
