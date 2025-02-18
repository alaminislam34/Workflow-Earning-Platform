import { useContext } from "react";
import { AuthContext } from "../../../Auth/AuthContext";

const WorkerProfile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="my-2">
      <div className="space-y-1">
        {/* Profile Image Section */}
        <div className="flex justify-center items-center">
          <img
            src={currentUser?.photo}
            alt="user"
            className="w-16 h-16 object-cover rounded-full border-2 border-white"
          />
        </div>

        {/* Update Name */}
        <div className="space-y-2 text-center">
          <h3 className="text-base">{currentUser?.name}</h3>
          <p className="text-xs">{currentUser?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
