import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";

const RoleBasedDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return;
  }
  // Redirect based on role
  switch (user?.role) {
    case "Admin":
      return <Navigate to="/dashboard/admin" replace />;
    case "Buyer":
      return <Navigate to="/dashboard/buyer" replace />;
    case "Worker":
      return <Navigate to="/dashboard/worker" replace />;
    default:
      return <h1 className="text-center text-2xl">Unauthorized Access</h1>;
  }
};

export default RoleBasedDashboard;
