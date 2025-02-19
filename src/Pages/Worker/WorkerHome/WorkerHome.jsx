import { useContext, useState, useMemo, useEffect } from "react";
import { AuthContext } from "../../../Auth/AuthContext";
import axiosInstance from "../../../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import DashboardStats from "./Chart/Chart";
import { TbChevronsLeft, TbChevronsRight } from "react-icons/tb";
import DashboardHomeTitle from "../../../Components/DashboardTitle/DashboardHomeTitle/DashboardHomeTitle";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";
import Aos from "aos";

const WorkerHome = () => {
  const { user, theme } = useContext(AuthContext);

  // fetch submissions data
  const { data: submissions = [] } = useQuery({
    queryKey: ["submission"],
    queryFn: async () => {
      const res = await axiosInstance(`/submissions?w_email=${user?.email}`);
      return res.data;
    },
  });

  const totalSubmissions = submissions?.length;
  const totalPending = submissions?.filter(
    (sub) => sub.status === "pending"
  ).length;

  // filter and reduce total earning
  const totalEarning = submissions
    ?.filter((sub) => sub.status === "approved")
    .reduce(
      (sum, submission) => sum + parseInt(submission.payable_amount || 0),
      0
    );

  // filter total approved submissions
  const approvedSubmissions = submissions?.filter(
    (sub) => sub.status === "approved"
  );
  console.log(approvedSubmissions);
  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(approvedSubmissions.length / itemsPerPage);

  const currentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return approvedSubmissions.slice(startIndex, endIndex);
  }, [currentPage, approvedSubmissions]);

  // Handle Page Change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    Aos.init({
      once: true,
      offset: 300,
      duration: 2000,
      delay: 300,
    });
  }, [user, submissions, currentPageData]);

  return (
    <div className="md:p-6">
      <Helmet>
        <title>Worker Home || Dashboard</title>
      </Helmet>
      <DashboardHomeTitle />
      <br />
      {/* Stats Section */}
      <DashboardStats
        approvedSubmissions={approvedSubmissions}
        totalEarning={totalEarning}
        totalSubmissions={totalSubmissions}
        totalPending={totalPending}
      />

      {/* Approved Submissions Table */}
      <br />
      <DashboardTitle title={"Approved Submissions"} />
      <br />
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className={`${
          theme === "light" ? "bg-white" : "bg-gray-800 text-white"
        } overflow-x-auto border-t-4 border-primaryColor  rounded-lg shadow-lg`}
      >
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-300 text-gray-700">
              <th>Serial</th>
              <th>Task Title</th>
              <th>Payable Amount</th>
              <th>Buyer Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData?.length > 0 ? (
              currentPageData?.map((submission, i) => (
                <tr key={submission._id} className="">
                  <td>{i + 1}</td>
                  <td className="truncate">{submission.task_title}</td>
                  <td>${submission.payable_amount}</td>
                  <td>{submission.buyer_name}</td>
                  <td>
                    <span className="bg-green-600 text-white rounded-xl text-xs p-1 px-2">
                      {submission.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border border-gray-300 p-4 text-center text-gray-500"
                >
                  No approved submissions found.
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
          className="px-4 py-2 mx-2 btn btn-sm shadow-xl rounded-lg hover:bg-primaryColor border bg-gray-300  disabled:bg-gray-200"
        >
          <TbChevronsLeft />
        </button>
        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <div key={index}>
            <button
              className={`px-3 py-1 btn btn-sm shadow-xl rounded-lg hover:bg-primaryColor ml-2 ${
                currentPage === index + 1
                  ? "bg-primaryColor text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          </div>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 btn btn-sm shadow-xl rounded-lg hover:bg-primaryColor border bg-gray-300  disabled:bg-gray-200"
        >
          <TbChevronsRight />
        </button>
      </div>
    </div>
  );
};

export default WorkerHome;
