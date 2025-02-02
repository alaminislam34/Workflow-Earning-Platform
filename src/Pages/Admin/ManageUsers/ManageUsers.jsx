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
    <div>
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
        <div className="flex gap-4 items-center my-2 px-2">
          <h2 className="text-lg md:text-xl font-semibold">Total Users:</h2>
          <span className="text-lg md:text-xl font-bold">{data?.length}</span>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-between md:items-center gap-4 py-4 px-4">
        <div>
          <input
            onChange={(v) => handleSearch(v.target.value)}
            type="text"
            placeholder="Search by user name"
            className="px-2 py-2 placeholder:text-xs w-full"
          />
        </div>
        <div className="flex justify-end items-end">
          <select
            onChange={(v) => handleSelectUser(v.target.value)}
            defaultValue="select"
            className="text-xs"
          >
            <option value="select" disabled>
              Select role
            </option>
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
