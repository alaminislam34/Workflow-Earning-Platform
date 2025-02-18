// import { useContext } from "react";
import { FaTasks } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { ImCoinDollar } from "react-icons/im";
import { MdAddTask, MdPayment } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../Auth/AuthContext";
import { useContext } from "react";

const BuyerSidebar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <ul className="flex flex-col gap-2  text-xs md:text-sm">
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
          <NavLink to="buyer" className="flex items-center gap-3">
            <GoHomeFill /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="addTask" className="flex items-center gap-3">
            <MdAddTask /> Add New Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="myTask" className="flex items-center gap-3">
            <FaTasks /> My Task`s
          </NavLink>
        </li>
        <li>
          <NavLink to="purchase" className="flex items-center gap-3">
            <ImCoinDollar /> Purchase Coin
          </NavLink>
        </li>
        <li>
          <NavLink to="payment" className="flex items-center gap-3">
            <MdPayment /> Payment History
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default BuyerSidebar;
