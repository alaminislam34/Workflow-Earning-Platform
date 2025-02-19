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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, currentUser, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    Aos.init({ once: true, duration: 1500, delay: 300, offset: 200 });
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "help", label: "Help" },
    { to: "blog", label: "Blog" },
  ];

  const dashboardRoute =
    currentUser?.role === "Admin"
      ? "dashboard/manageUsers"
      : currentUser?.role === "Worker"
      ? "dashboard/taskList"
      : "dashboard/addTask";

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div
        data-aos="fade-right"
        data-aos-anchor-placement="center-bottom"
        className="max-w-7xl mx-auto px-4 lg:px-2 py-3 flex items-center justify-between relative"
      >
        <h2
          className="text-lg lg:text-2xl font-bold text-primaryColor cursor-pointer"
          onClick={() => navigate("/")}
        >
          WorkFlow
        </h2>

        <div className="hidden lg:flex items-center space-x-2 text-sm">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} className="font-medium">
              {label}
            </NavLink>
          ))}

          {!user ? (
            <>
              <NavLink to="/login" className="font-medium">
                Login
              </NavLink>
              <NavLink to="/register" className="font-medium">
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="dashboard/profileInfo" className="font-medium">
                Profile
              </NavLink>
              <NavLink to={dashboardRoute} className="font-medium">
                {currentUser?.role === "Admin"
                  ? "Manage Users"
                  : currentUser?.role === "Worker"
                  ? "Task List"
                  : "Add New Tasks"}
              </NavLink>
              <p className="flex items-center gap-2 text-primaryColor font-medium">
                <ImCoinDollar /> {currentUser?.coins || 0}
              </p>
              <img
                src={user?.photoURL}
                referrerPolicy="no-referrer"
                className="w-10 h-10 object-cover rounded-full border-2 border-primaryColor"
              />
              <button
                onClick={handleLogout}
                className="text-red-500 font-semibold"
              >
                <FiLogOut className="text-lg" />
              </button>
            </>
          )}
          <a
            href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-alaminislam34"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 bg-btnColor text-white rounded-md hover:bg-primaryColor"
          >
            Join as Dev.
          </a>
        </div>

        <button
          className="lg:hidden text-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <RxCross2 className="text-primaryColor" />
          ) : (
            <RiMenu3Fill className="text-primaryColor" />
          )}
        </button>
      </div>

      <div
        ref={menuRef}
        className={`absolute bg-base-200 duration-500 ${
          isMenuOpen
            ? "top-12 right-2 opacity-100"
            : "top-20 opacity-0 pointer-events-none right-2"
        } space-y-6 w-52 z-50 rounded-lg shadow-xl`}
      >
        {!user ? (
          <ul className="flex flex-col gap-3">
            <NavLink to="/login" className="text-gray-600 font-medium py-2">
              Login
            </NavLink>
            <NavLink to="/register" className="text-gray-600 font-medium py-2">
              Register
            </NavLink>
          </ul>
        ) : (
          <ul className="text-sm">
            <li className="p-4 flex justify-between">
              <img
                src={currentUser?.photo}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full border-2 border-primaryColor"
              />
              <p className="flex items-center gap-2 text-primaryColor">
                <ImCoinDollar /> {currentUser?.coins || 0}
              </p>
            </li>
            <NavLink
              to="dashboard/profileInfo"
              className="text-gray-600 font-medium py-2 px-2"
            >
              Profile
            </NavLink>
            <NavLink
              to={dashboardRoute}
              className="text-gray-600 font-medium py-2 px-2"
            >
              Dashboard
            </NavLink>
            <button
              onClick={handleLogout}
              className="text-red-500 font-medium py-2 px-3 w-full text-left"
            >
              Logout
            </button>
          </ul>
        )}
        <a
          href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-alaminislam34"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center py-2 bg-primaryColor text-white"
        >
          Join as Dev.
        </a>
      </div>

      <ToastContainer autoClose={2000} hideProgressBar position="top-center" />
    </nav>
  );
};

export default Header;
