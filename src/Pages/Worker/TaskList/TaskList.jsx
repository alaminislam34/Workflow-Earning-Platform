import { Helmet } from "react-helmet";
import TaskListWorker from "./TaskListWorker";

const TaskList = () => {
  return (
    <div>
      <Helmet>
        <title>All Tasks </title>
      </Helmet>
      <TaskListWorker />
    </div>
  );
};

export default TaskList;
