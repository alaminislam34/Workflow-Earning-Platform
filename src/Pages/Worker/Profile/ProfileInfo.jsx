import { useContext } from "react";
import { AuthContext } from "../../../Auth/AuthContext";
import { CiLocationOn } from "react-icons/ci";

const ProfileInfo = () => {
  const { currentUser, theme } = useContext(AuthContext);
  return (
    <div className="">
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-anchor-placement="center-bottom"
        className={`${
          theme === "light" ? "bg-white" : "bg-gray-800 text-white"
        } flex gap-4 lg:gap-6  p-4 m-2 rounded`}
      >
        <div className="">
          <img
            src={currentUser?.photo}
            alt="user"
            className="w-16 h-16 lg:w-24 lg:h-24 object-cover bg-cover rounded-full"
          />
        </div>
        <div className=" space-y-3 lg:space-y-4">
          <h3 className="text-base lg:text-lg font-medium">
            {currentUser?.name}
            <p className="text-xs lg:text-sm">{currentUser?.role}</p>
          </h3>
          <p className="text-xs flex items-center gap-2">
            <CiLocationOn /> Bangladesh
          </p>
        </div>
      </div>
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-anchor-placement="center-bottom"
        className={`${
          theme === "light" ? "bg-white" : "bg-gray-800 text-white"
        } p-4 lg:p-6 m-2 rounded shadow-xl`}
      >
        <div className="lg:w-1/2">
          <p className="text-base lg:text-lg font-semibold py-4 lg:py-6">
            Info
          </p>
          <div className="space-y-3 lg:space-y-4 text-xs lg:text-sm">
            <p className="grid grid-cols-2 items-center">
              <span className="">Full Name </span>
              <span>: {currentUser?.name}</span>
            </p>
            <p className="grid grid-cols-2 items-center">
              <span className="">Email </span>
              <span>: {currentUser?.email}</span>
            </p>
            {/* <p className="grid grid-cols-2 items-center">
              <span className="">Phone </span>
              <span>: 01821858917</span>
            </p>
            <p className="grid grid-cols-2 items-center">
              <span className="">Location </span>
              <span>: Dhaka, Bangladesh</span>
            </p>
            <p className="grid grid-cols-2 items-center">
              <span className="">Joining Date </span>
              <span>: 15/06/2024</span>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
