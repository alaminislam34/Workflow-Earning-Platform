import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";

// eslint-disable-next-line react/prop-types
const WorkerRoutes = ({ children }) => {
  const { currentUser, roleLoading } = useContext(AuthContext);

  if (roleLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }
  if (currentUser?.role !== "Worker") {
    return;
  } else {
    children;
  }
  return children;
};

export default WorkerRoutes;
