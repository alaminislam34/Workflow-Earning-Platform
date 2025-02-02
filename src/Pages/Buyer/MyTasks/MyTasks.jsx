import { useContext } from "react";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";
import { AuthContext } from "../../../Auth/AuthContext";
import MyTaskTable from "./MyTaskTable";
import { Helmet } from "react-helmet";

const MyTasks = () => {
  const { currentUser, setCoin } = useContext(AuthContext);
  return (
    <div>
      <Helmet>
        <title>Tasks List || Buyer</title>
      </Helmet>
      <DashboardTitle title={"My Tasks"} />
      <section>
        <MyTaskTable userCoins={currentUser?.coins} updateUserCoins={setCoin} />
      </section>
    </div>
  );
};

export default MyTasks;
