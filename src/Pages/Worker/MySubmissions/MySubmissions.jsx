import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../../Axios/useAxiosSecure";
import { AuthContext } from "../../../Auth/AuthContext";
import { Helmet } from "react-helmet";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Aos from "aos";

const MySubmissions = () => {
  const { user, theme } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axiosInstance(
          `/submissions?w_email=${user?.email}`
        );
        setSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchSubmissions();
    }
    Aos.init({
      once: true,
      offset: 300,
      duration: 2000,
      delay: 300,
    });
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubmissions = submissions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(submissions.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="md:p-6">
      <Helmet>
        <title>Submissions || Worker</title>
      </Helmet>
      <DashboardTitle title={"My Submissions"} />
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
              <th>#</th>
              <th>Task Title</th>
              <th>Payable Amount</th>
              <th>Buyer Name</th>
              <th>Submission Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentSubmissions.length > 0 ? (
              currentSubmissions.map((submission, i) => (
                <tr key={submission._id} className="">
                  <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                  <td>{submission.task_title}</td>
                  <td>${submission.payable_amount}</td>
                  <td>{submission.buyer_name}</td>
                  <td>
                    {new Date(submission.current_date).toLocaleDateString()}
                  </td>
                  <td>
                    <span
                      className={`py-1 px-2 text-xs rounded-md text-white capitalize ${
                        submission.status === "approved"
                          ? "bg-green-600"
                          : submission.status === "pending"
                          ? "bg-yellow-600"
                          : "bg-red-600"
                      }`}
                    >
                      {" "}
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
                  No task submissions review.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="flex justify-center mt-4 p4"
      >
        <ul className="flex items-center space-x-2">
          {/* Previous Button */}
          <li>
            <button
              className={`rounded-lg shadow-xl btn btn-sm hover:bg-primaryColor ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
              disabled={currentPage === 1}
            >
              <MdChevronLeft />
            </button>
          </li>

          {/* Page Numbers */}
          {[...Array(totalPages)]?.map((_, index) => (
            <li key={index}>
              <button
                className={`rounded-lg shadow-xl btn btn-sm hover:bg-primaryColor ${
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

          {/* Next Button */}
          <li>
            <button
              className={`rounded-lg shadow-xl btn btn-sm hover:bg-primaryColor ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
              disabled={currentPage === totalPages}
            >
              <MdChevronRight />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MySubmissions;
