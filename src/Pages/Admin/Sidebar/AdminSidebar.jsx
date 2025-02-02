// import { useContext } from "react";
import { FaTasks } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../Auth/AuthContext";
import { useContext } from "react";

const AdminSidebar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <ul className="flex flex-col gap-2 text-white text-xs md:text-sm">
        <li className="flex flex-col text-left border-b border-white pb-4 mb-4">
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
        </li>
        <li>
          <NavLink to="admin" className="flex items-center gap-3">
            <GoHomeFill /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="manageUsers" className="flex items-center gap-3">
            <FaUsersGear /> Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink to="manageTasks" className="flex items-center gap-3">
            <FaTasks /> Manage Tasks
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
