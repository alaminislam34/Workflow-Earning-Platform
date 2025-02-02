import { AiFillDelete } from "react-icons/ai";
import axiosInstance from "../../../Axios/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Auth/AuthContext";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Aos from "aos";

// eslint-disable-next-line react/prop-types
const ManageUsersTable = ({ data, refetch }) => {
  const users = data;
  const { user } = useContext(AuthContext);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const removeUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButtonColor: "#FF6F00",
      cancelButtonColor: "#179221",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosInstance.delete(`/users/${userId}`);

          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "The user has been deleted.",
              icon: "success",
            });
            refetch();
          } else {
            toast.error("Failed to delete user.");
          }
        } catch (error) {
          Swal.fire(
            "Error",
            "Failed to delete user. Please try again.",
            "error"
          );
          toast.error("Something went wrong. Please try again.", error.message);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "The user is safe",
          icon: "error",
          confirmButtonColor: "#FF6F00",
        });
      }
    });
  };

  const updateRole = async (id, value) => {
    const res = await axiosInstance.patch(`/updateUserRole/${id}`, {
      value,
    });

    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        title: "Updated",
        text: `${user?.displayName}'s role has been updated successfully!`,
        timer: 1500,
        icon: "success",
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: "No Change",
        text: `No changes were made to ${user?.displayName}'s role.`,
        timer: 1500,
        icon: "info",
        showConfirmButton: false,
      });
    }
  };

  // Pagination Logic
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    Aos.init({
      once: true,
      offset: 300,
      duration: 2000,
      delay: 300,
    });
  }, [data, paginatedUsers]);

  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      className=""
    >
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="table w-full text-xs">
          <thead className="bg-gray-100 text-gray-700 truncate">
            <tr>
              <th className=" text-left">#</th>
              <th className=" text-left">Photo</th>
              <th className=" text-left">Name</th>
              <th className=" text-left">Email</th>
              <th className=" text-left">Role</th>
              <th className=" text-left">Coins</th>
              <th className=" text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-xs md:text-sm">
            {paginatedUsers?.map((user, i) => (
              <tr key={user._id} className="border-b hover:bg-gray-50 truncate">
                <td>{(currentPage - 1) * itemsPerPage + i + 1} </td>
                <td className=" text-center">
                  <div className="">
                    <img
                      src={user.photo}
                      alt="User"
                      className="w-10 h-10 bg-cover object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </td>
                <td className="">{user.name}</td>
                <td className="">{user.email}</td>
                <td className="">
                  {user.role === "Admin" ? (
                    <span className="text-green-500 font-semibold">Admin</span>
                  ) : (
                    <select
                      defaultValue={user.role}
                      onChange={(e) => updateRole(user._id, e.target.value)}
                      className="border p-2 rounded-md shadow-sm"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Buyer">Buyer</option>
                      <option value="Worker">Worker</option>
                    </select>
                  )}
                </td>
                <td className="">${user.coins}</td>
                <td className=" text-center">
                  <button
                    onClick={() => removeUser(user._id)}
                    className="text-red-600 hover:text-red-800 transition duration-300"
                    title="Delete User"
                  >
                    <AiFillDelete className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 p-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-sm hover:bg-primaryColor bg-white text-black shadow-xl border-btnColor text-lg rounded-lg mr-2"
        >
          <MdChevronLeft />
        </button>
        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <li key={index} className="list-none mr-2">
            <button
              className={`btn btn-sm hover:bg-primaryColor ${
                currentPage === index + 1
                  ? "bg-primaryColor text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-sm hover:bg-primaryColor bg-white text-black shadow-xl border-btnColor text-lg rounded-lg ml-2"
        >
          <MdChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ManageUsersTable;
