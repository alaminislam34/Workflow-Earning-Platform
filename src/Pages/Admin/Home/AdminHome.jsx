import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../Axios/useAxiosSecure";
import Swal from "sweetalert2";
import { useContext, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../../Auth/AuthContext";
import AdminChart from "./AdminChart/AdminChart";
import DashboardHomeTitle from "../../../Components/DashboardTitle/DashboardHomeTitle/DashboardHomeTitle";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { TbChevronsLeft, TbChevronsRight } from "react-icons/tb";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch statistics
  const { data: stats, refetch } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosInstance(`/allUsers`);
      return res.data;
    },
  });

  // Fetch withdrawal requests
  const { data: withdrawalRequests } = useQuery({
    queryKey: ["withdrawalRequests"],
    queryFn: async () => {
      const res = await axiosInstance("/withdrawRequests");
      return res.data;
    },
  });

  const sortedData = withdrawalRequests?.sort((a, b) => {
    return new Date(b.withdraw_date) - new Date(a.withdraw_date);
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);
  console.log(totalPages);
  const currentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData?.slice(startIndex, endIndex);
  }, [currentPage, sortedData]);
  if (!withdrawalRequests) {
    return;
  }
  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Handle payment success
  const handlePaymentSuccess = async (
    requestId,
    email,
    amount,
    workerEmail
  ) => {
    try {
      await axiosInstance.patch(`/approveWithdrawal/${requestId}`, {
        adminName: user?.displayName,
        workerEmail,
        actionRoute: "/dashboard/worker",
        email,
        amount,
      });
      Swal.fire("Success", "Payment approved successfully!", "success");
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to approve payment. Try again!", error);
    }
  };

  const totalPayments = withdrawalRequests?.reduce(
    (sum, v) => sum + parseInt(v.withdrawal_coin),
    0
  );

  return (
    <div className="md:p-4">
      <Helmet>
        <title>Admin Home</title>
      </Helmet>
      <DashboardHomeTitle />
      <br />
      {/* Admin Stats */}
      <AdminChart stats={stats} totalPayments={totalPayments} />

      {/* Withdrawal Requests Table */}
      <h2
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="text-xl font-bold mb-4"
      >
        Withdrawal Requests
      </h2>
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="overflow-x-auto border-t-4 border-primaryColor bg-white  rounded-lg shadow-lg"
      >
        <table className="table w-full rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th>#</th>
              <th>User Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData?.length > 0 ? (
              currentPageData?.map(
                (
                  { _id, worker_name, withdrawal_coin, status, worker_email },
                  i
                ) => (
                  <tr key={_id} className="border-b hover:bg-gray-50">
                    <td className="">
                      {(currentPage - 1) * itemsPerPage + i + 1}
                    </td>
                    <td className="">{worker_name}</td>
                    <td className="">{withdrawal_coin} Coins</td>
                    <td
                      className={`font-medium ${
                        status === "approved"
                          ? "text-green-600"
                          : "text-orange-400"
                      }`}
                    >
                      {status}
                    </td>
                    <td className="">
                      {status === "pending" ? (
                        <button
                          onClick={() =>
                            handlePaymentSuccess(
                              _id,
                              worker_email,
                              withdrawal_coin,
                              worker_email
                            )
                          }
                          className="bg-btnColor text-white px-4 py-1 rounded shadow hover:bg-primaryColor"
                        >
                          Payment Success
                        </button>
                      ) : (
                        <span className="text-green-600 font-bold text-lg md:text-xl">
                          <IoCheckmarkDoneSharp />
                        </span>
                      )}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border border-gray-300 p-4 text-center text-gray-500"
                >
                  No withdrawal requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="flex justify-center mt-4 p-4"
      >
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 btn btn-sm shadow-xl rounded-lg hover:bg-primaryColor border bg-gray-300 disabled:bg-gray-200"
        >
          <TbChevronsLeft />
        </button>
        {[...Array(totalPages)]?.map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 btn btn-sm shadow-xl rounded-lg hover:bg-primaryColor ml-2 ${
              currentPage === index + 1
                ? "bg-primaryColor text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 btn btn-sm shadow-xl rounded-lg hover:bg-primaryColor border bg-gray-300 disabled:bg-gray-200"
        >
          <TbChevronsRight />
        </button>
      </div>
    </div>
  );
};

export default AdminHome;
