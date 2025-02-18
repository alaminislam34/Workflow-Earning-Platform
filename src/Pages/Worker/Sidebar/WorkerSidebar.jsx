import { CiBookmarkRemove, CiGrid31, CiUser } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { PiHandWithdrawThin } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import WorkerProfile from "../Profile/WorkerProfile";
import logo from "../../../assets/logos/brandLogo.jpg";

const WorkerSidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="text-gray-600">
      <ul className="flex flex-col gap-2  text-xs md:text-sm">
        <div
          onClick={() => navigate("/")}
          className="flex items-center justify-center cursor-pointer"
        >
          <img src={logo} alt="logo" className="w-24 lg:w-28" />
        </div>
        <WorkerProfile />
        {/* <li className="flex flex-col text-left border-b border-white pb-4 mb-4">
          <img
            src={currentUser?.photo}
            alt="user"
            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full border-2 border-white"
          />
          <div className="mt-2">
            <p className="text-base md:text-lg font-semibold">
              {currentUser?.name}
            </p>
            <p className="text-sm font-semibold">{currentUser?.role}</p>
            <p className="text-xs text-gray200">{currentUser?.email}</p>
          </div>
        </li> */}
        <li data-aos="fade-right" data-aos-anchor-placement="center-bottom">
          <NavLink to="Worker" className="flex items-center font-medium gap-2">
            <GoHome /> Dashboard
          </NavLink>
        </li>
        <li data-aos="fade-right" data-aos-anchor-placement="center-bottom">
          <NavLink
            to="profileInfo"
            className="flex items-center font-medium gap-2"
          >
            <CiUser /> Profile
          </NavLink>
        </li>
        <li data-aos="fade-right" data-aos-anchor-placement="center-bottom">
          <NavLink
            to="taskList"
            className="flex items-center font-medium gap-2"
          >
            <CiGrid31 /> Task List
          </NavLink>
        </li>
        <li data-aos="fade-right" data-aos-anchor-placement="center-bottom">
          <NavLink
            to="mySubmissions"
            className="flex items-center font-medium gap-2"
          >
            <CiBookmarkRemove /> My Submissions
          </NavLink>
        </li>
        <li data-aos="fade-right" data-aos-anchor-placement="center-bottom">
          <NavLink
            to="withDrawal"
            className="flex items-center font-medium gap-2"
          >
            <PiHandWithdrawThin /> Withdrawals
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default WorkerSidebar;
