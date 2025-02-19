import { useContext } from "react";
import { AuthContext } from "../../../Auth/AuthContext";

const Footer2 = () => {
  const { theme } = useContext(AuthContext);
  return (
    <div
      className={`p-4 flex justify-between items-center ${
        theme === "light" ? "bg-white" : "bg-gray-800 text-white"
      }`}
    >
      <p className="text-xs">Copyright © 2023 - All right reserved</p>
      <p className="text-xs">
        Developed by <span className="text-primaryColor">MD Al Amin Islam</span>
      </p>
    </div>
  );
};

export default Footer2;
