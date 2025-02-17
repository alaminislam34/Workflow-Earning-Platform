import { FaCheckDouble, FaTasks } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { PiHandWithdrawFill } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import WorkerProfile from "../Profile/WorkerProfile";

const WorkerSidebar = () => {
  return (
    <div>
      <ul className="flex flex-col gap-2 text-white text-xs md:text-sm">
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
        <div className="border-b border-dashed border-white my-2"></div>
        <li data-aos="fade-right" data-aos-anchor-placement="center-bottom">
          <NavLink to="Worker" className="flex items-center gap-2">
            <GoHomeFill /> Dashboard
          </NavLink>
        </li>
        <li data-aos="fade-right" data-aos-anchor-placement="center-bottom">
          <NavLink to="taskList" className="flex items-center gap-2">
            <FaTasks /> Task List
          </NavLink>
        </li>
        <li data-aos="fade-right" data-aos-anchor-placement="center-bottom">
          <NavLink to="mySubmissions" className="flex items-center gap-2">
            <FaCheckDouble /> My Submissions
          </NavLink>
        </li>
        <li data-aos="fade-right" data-aos-anchor-placement="center-bottom">
          <NavLink to="withDrawal" className="flex items-center gap-2">
            <PiHandWithdrawFill /> Withdrawals
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default WorkerSidebar;
