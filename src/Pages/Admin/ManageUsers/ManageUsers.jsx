import { useContext } from "react";
import { userContext } from "../../../Auth/ContextAPI/UsersApi/UsersContext";
// import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";
import ManageUsersTable from "./ManageUsersTable";
import { Helmet } from "react-helmet";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";

const ManageUsers = () => {
  const { data, refetch, setName, setRole } = useContext(userContext);

  const handleSearch = (v) => {
    setName(v);
  };
  const handleSelectUser = (v) => {
    setRole(v);
  };
  return (
    <div className="p-2">
      <Helmet>
        <title>Manage Task || Admin</title>
      </Helmet>
      {/* <DashboardTitle title={"Manage Users"} /> */}
      <DashboardTitle title={"Manage Users"} />

      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className=""
      >
        <div className="flex gap-4 items-center my-2">
          <h2 className="text-base lg:text-lg font-medium">Total Users:</h2>
          <span className="text-base lg:text-lg font-medium">
            {data?.length}
          </span>
        </div>
      </div>
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="w-full flex flex-col md:flex-row justify-between md:items-center gap-4 py-4"
      >
        <div>
          <input
            onChange={(v) => handleSearch(v.target.value)}
            type="text"
            placeholder="Search by user name"
            className="px-2 lg:px-4 py-2 border border-gray-400 placeholder:text-xs placeholder:md:text-sm w-full  bg-base-200 rounded-md"
          />
        </div>
        <div className="flex justify-end gap-2 items-center">
          <p>Sort: </p>
          <select
            onChange={(v) => handleSelectUser(v.target.value)}
            defaultValue="select"
            className="text-xs border-none focus:border-none bg-base-200 rounded-md py-2 px-2"
          >
            <option value="select" disabled>
              Select role
            </option>
            <option value="">All</option>
            <option value="Admin">Admin</option>
            <option value="Buyer">Buyer</option>
            <option value="Worker">Worker</option>
          </select>
        </div>
      </div>
      <ManageUsersTable data={data} refetch={refetch} />
    </div>
  );
};

export default ManageUsers;
