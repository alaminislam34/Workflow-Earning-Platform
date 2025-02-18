import { CiBookmarkRemove, CiGrid31, CiUser } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { PiHandWithdrawThin } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import WorkerProfile from "../Profile/WorkerProfile";
import logo from "../../../assets/logos/brandLogo.jpg";
import { BsCoin } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../../../Auth/AuthContext";

const WorkerSidebar = () => {
  const { navOpen } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="text-gray-600 relative z-[100] duration-1000">
      {navOpen ? (
        <ul className="flex flex-col gap-2 text-xs md:text-sm">
          <div
            onClick={() => navigate("/")}
            className="flex items-center justify-center cursor-pointer"
          >
            <img src={logo} alt="logo" className="w-24 lg:w-28" />
          </div>
          <WorkerProfile />

          <li data-aos="fade-right" data-aos-anchor-placement="center-bottom">
            <NavLink
              to="Worker"
              className="flex items-center font-medium hover:font-semibold duration-300 gap-2"
            >
              <GoHome className="text-lg lg:text-xl" /> Dashboard
            </NavLink>
          </li>
          <li data-aos="fade-right" data-aos-anchor-placement="center-bottom">
            <NavLink
              to="profileInfo"
              className="flex items-center font-medium hover:font-semibold duration-300 gap-2"
            >
              <CiUser className="text-lg lg:text-xl" /> Profile
            </NavLink>
          </li>
          <li data-aos="fade-right" data-aos-anchor-placement="center-bottom">
            <NavLink
              to="taskList"
              className="flex items-center font-medium hover:font-semibold duration-300 gap-2"
            >
              <CiGrid31 className="text-lg lg:text-xl" /> Task List
            </NavLink>
          </li>
          <li data-aos="fade-right" data-aos-anchor-placement="center-bottom">
            <NavLink
              to="mySubmissions"
              className="flex items-center font-medium hover:font-semibold duration-300 gap-2"
            >
              <CiBookmarkRemove className="text-lg lg:text-xl" /> My Submissions
            </NavLink>
          </li>
          <li data-aos="fade-right" data-aos-anchor-placement="center-bottom">
            <NavLink
              to="withDrawal"
              className="flex items-center font-medium hover:font-semibold duration-300 gap-2"
            >
              <PiHandWithdrawThin className="text-lg lg:text-xl" /> Withdrawals
            </NavLink>
          </li>
        </ul>
      ) : (
        <div className="flex justify-center">
          <ul className="flex flex-col gap-2  text-xs md:text-sm">
            <li className="flex justify-center my-2">
              <button>
                <BsCoin className="text-2xl" />
              </button>
            </li>
            <li>
              <NavLink
                to="Worker"
                data-tip="Dashboard"
                className="flex items-center font-medium tooltip tooltip-right hover:font-semibold duration-300 gap-2"
              >
                <GoHome className="text-lg lg:text-xl" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="Profile"
                data-tip="Dashboard"
                className="flex items-center font-medium tooltip tooltip-right hover:font-semibold duration-300 gap-2"
              >
                <CiUser className="text-lg lg:text-xl" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="taskList"
                data-tip="Tasks"
                className="flex items-center font-medium tooltip tooltip-right hover:font-semibold duration-300 gap-2"
              >
                <CiGrid31 className="text-lg lg:text-xl" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="mySubmissions"
                data-tip="Submissions"
                className="flex items-center font-medium tooltip tooltip-right hover:font-semibold duration-300 gap-2"
              >
                <CiBookmarkRemove className="text-lg lg:text-xl" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="withDrawal"
                data-tip="Withdrawal"
                className="flex items-center font-medium tooltip tooltip-right hover:font-semibold duration-300 gap-2"
              >
                <PiHandWithdrawThin className="text-lg lg:text-xl" />
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorkerSidebar;
