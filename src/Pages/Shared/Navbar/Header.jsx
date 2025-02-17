import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../Auth/AuthContext";
import { signOut } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "../../../Firebase/firebase.config";
import logo from "../../../assets/logos/brandLogo.jpg";
import { RxCross2 } from "react-icons/rx";
import { ImCoinDollar } from "react-icons/im";
import Aos from "aos";
import "aos/dist/aos.css";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, currentUser } = useContext(AuthContext);
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

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div
        data-aos="fade-right"
        data-aos-anchor-placement="center-bottom"
        className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between relative"
      >
        {/* Website Logo */}
        <div
          onClick={() => {
            navigate("/");
          }}
          className="flex items-center cursor-pointer"
        >
          <img src={logo} alt="logo" className="w-24 md:w-28 lg:w-40" />
        </div>

        <div className="hidden lg:flex items-center space-x-6 text-sm">
          {!user && (
            <>
              <NavLink to="/login" className="font-medium">
                Login
              </NavLink>
              <NavLink to="/register" className="font-medium">
                Register
              </NavLink>
              <a
                href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-alaminislam34"
                style={{ color: "#ffffff", transitionDuration: "0.2s" }}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 bg-btnColor text-white rounded-md hover:bg-primaryColor"
              >
                Join as Developer
              </a>
            </>
          )}

          {user && (
            <>
              <NavLink
                to={`/dashboard/${currentUser?.role}`}
                className="hover:text-primaryColor text-gray-600 font-medium py-2 px-2"
              >
                Dashboard
              </NavLink>

              <p className=" font-medium flex items-center gap-2 text-primaryColor">
                <ImCoinDollar />{" "}
                <span className="font-bold">
                  {currentUser?.coins ? currentUser?.coins : 0}
                </span>
              </p>

              <div className="flex items-center space-x-2">
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
                  Logout
                </button>
              </div>
              <a
                href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-alaminislam34"
                style={{ color: "#ffffff", transitionDuration: "0.2s" }}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 bg-btnColor text-white rounded-md hover:bg-primaryColor"
              >
                Join as Developer
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
          isMenuOpen ? " top-20 right-2" : "top-20 -right-64"
        } shadow-md p-4 space-y-6 max-w-sm z-50 rounded-lg`}
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
          <div className="flex justify-between w-full">
            <ul className="flex flex-col gap-2">
              <li className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <img
                    src={currentUser?.photo}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover bg-center rounded-full border-2 border-primaryColor"
                  />
                  <small>{user?.email} </small>
                </div>
                {/* Coins Section */}
                <p className="font-medium flex items-center gap-2 text-primaryColor">
                  <ImCoinDollar />
                  <span className="font-bold">
                    {currentUser?.coins ? currentUser?.coins : 0}
                  </span>
                </p>
              </li>

              <li className="border-b-2 border-dashed"></li>
              <li>
                {/* Dashboard */}
                <NavLink
                  to={`/dashboard/${currentUser?.role}`}
                  className="text-gray-600 font-medium py-2 rounded-md inline-block"
                >
                  Dashboard
                </NavLink>
              </li>

              <li className="border-b-2 border-dashed"></li>
              <li>
                {/* Join as Developer */}
                <a
                  href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-alaminislam34"
                  style={{ color: "#ffffff", transitionDuration: "0.2s" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-2.5 bg-btnColor text-white rounded-md inline-block"
                >
                  Join as Developer
                </a>
              </li>

              <li className="border-b-2 border-dashed"></li>
              <li className="flex items-center justify-center">
                {/* Profile & Logout */}
                <div>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 cursor-pointer hover:text-red-600 py-1.5 flex items-center flex-row gap-2"
                  >
                    <IoMdLogOut /> Logout
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ToastContainer autoClose={2000} position="top-center" />
    </nav>
  );
};

export default Header;
