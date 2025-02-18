import { useContext } from "react";
import { AuthContext } from "../../../Auth/AuthContext";

const ProfileInfo = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="bg-white p-4">
      <div className="flex gap-4">
        <div className="">
          <img
            src={currentUser?.photo}
            alt="user"
            className="w-16 h-16 lg:w-24 lg:h-24 object-cover bg-cover rounded-full"
          />
        </div>
        <div>
          <h3>{currentUser?.name}</h3>
          <p>{currentUser?.role}</p>
          <p>{currentUser?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
