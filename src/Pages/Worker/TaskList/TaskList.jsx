import { Helmet } from "react-helmet";
import TaskListWorker from "./TaskListWorker";

const TaskList = () => {
  return (
    <div className="px-2">
      <Helmet>
        <title>All Tasks </title>
      </Helmet>
      <TaskListWorker />
    </div>
  );
};

export default TaskList;
