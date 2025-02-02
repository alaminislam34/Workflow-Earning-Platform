import { useContext } from "react";
import AddTaskForm from "./AddTaskForm";
import { AuthContext } from "../../../Auth/AuthContext";
import { Helmet } from "react-helmet";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";

const AddNewTasks = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <Helmet>
        <title>Add Task || Buyer</title>
      </Helmet>
      <DashboardTitle title={"Add New Task"} />

      <section className="w-11/12 mx-auto">
        <AddTaskForm userCoins={currentUser?.coins} />
      </section>
    </div>
  );
};

export default AddNewTasks;
