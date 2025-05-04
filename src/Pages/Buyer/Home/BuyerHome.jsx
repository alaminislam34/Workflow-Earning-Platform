import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../Axios/useAxiosSecure";
import { AuthContext } from "../../../Auth/AuthContext";
import Swal from "sweetalert2";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import useUpdateCoin from "../../../Hook/CoinUpdateHook/useUpdateCoin";
import { Helmet } from "react-helmet";
import { BiDetail } from "react-icons/bi";
import BuyerChart from "./BuyerChart/BuyerChart";
import DashboardHomeTitle from "../../../Components/DashboardTitle/DashboardHomeTitle/DashboardHomeTitle";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";

const BuyerHome = () => {
  const { user, currentUser, setReview, theme } = useContext(AuthContext);
  const { mutate } = useUpdateCoin();
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Fetch buyer's tasks
  const { data: tasks = [] } = useQuery({
    queryKey: ["buyerTasks"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/buyerTasks?email=${user?.email}`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: !!user,
  });

  const { data: submissions = [], refetch } = useQuery({
    queryKey: ["taskSubmissions"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/submissions?b_email=${user?.email}`
      );
      setReview(res.data.filter((task) => task.status == "pending"));
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Approve a submission
  const handleApprove = async (
    submissionId,
    amount,
    workerEmail,
    task_title,
    buyer_name
  ) => {
    // Validate Coin Balance
    if (!currentUser?.coins || currentUser?.coins < amount) {
      Swal.fire("Error", "Insufficient amount balance.", "error");
      return;
    }

    try {
      await axiosInstance.patch(`/approveSubmission/${submissionId}`, {
        amount,
        workerEmail,
        task_title,
        buyer_name,
      });

      const payCoin = parseInt(amount, 10);

      mutate(
        { email: user?.email, newCoin: currentUser?.coins - payCoin },
        {
          onSuccess: () => {
            Swal.fire(
              "Success",
              "Submission approved successfully.",
              "success"
            );
          },
          onError: (error) => {
            console.error("Error updating coin balance:", error);
          },
        }
      );
      refetch();
    } catch (error) {
      console.error("Error approving submission:", error);
      Swal.fire("Error", "Failed to approve submission.", "error");
    }
  };

  // Reject a submission
  const handleReject = async (
    submissionId,
    taskId,
    taskTitle,
    buyerName,
    workerEmail
  ) => {
    console.table({ submissionId, taskId, taskTitle, buyerName, workerEmail });
    try {
      await axiosInstance.patch(`/rejectSubmission/${submissionId}`, {
        taskId,
        taskTitle,
        buyerName,
        workerEmail,
      });
      Swal.fire("Rejected", "Submission rejected successfully.", "success");
      Swal.fire({
        title: "Rejected",
        text: "Submission Rejected Success",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
      });
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to reject submission.", "error");
    }
  };

  const totalTasks = tasks.length;
  const pendingTasks = submissions.filter((task) => task.status == "pending");
  const completeTask = submissions.filter((task) => task.status == "approved");
  console.log(pendingTasks);
  const totalPayment = parseInt(
    submissions
      .filter((pay) => pay.status === "approved")
      .reduce((sum, payable) => sum + parseInt(payable.payable_amount) || 0, 0)
  );

  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: <BiDetail />,
    },
    {
      label: "Pending Tasks",
      value: pendingTasks?.length,
      icon: <RxCrossCircled />,
    },
    {
      label: "Complete Tasks",
      value: completeTask?.length,
      icon: <IoCheckmarkDoneSharp />,
    },
    {
      label: "Total Payment",
      value: totalPayment,
      icon: <BiDetail />,
    },
  ];

  return (
    <div className="md:p-5">
      <Helmet>
        <title>Buyer Home</title>
      </Helmet>
      <DashboardHomeTitle />
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats?.map(({ label, value, icon }, i) => (
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            data-aos-delay={i * 100}
            key={i}
            className={`p-4 rounded-2xl shadow text-center relative group ${
              theme === "light"
                ? "bg-white border border-primaryColor"
                : "bg-gray-800 text-white"
            }`}
          >
            <div className="flex items-center justify-center pb-2">
              <h3 className="flex items-center justify-center group-hover:bg-primaryColor duration-300 group-hover:text-white w-10 h-10 rounded-full border border-primaryColor text-primaryColor">
                {icon}
              </h3>
            </div>
            <p className="flex flex-row gap-2 items-center justify-center">
              {label} {value}
            </p>
          </div>
        ))}
      </div>
      <BuyerChart
        totalTasks={totalTasks}
        completeTask={completeTask?.length}
        totalPayments={totalPayment}
        userCoins={currentUser?.coins}
      />
      <DashboardTitle title={"Task Submissions to Review"} />
      <br />

      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className={`${
          theme === "light" ? "bg-white" : "bg-gray-800 text-white"
        } overflow-x-auto border-t-4 border-primaryColor rounded-lg shadow-lg`}
      >
        <table className="table w-full">
          <thead>
            <tr className="text-gray-700 bg-gray-300 text-left">
              <th>#</th>
              <th>Worker Name</th>
              <th>Task Title</th>
              <th>Payable Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingTasks?.length > 0 ? (
              pendingTasks.map((submission, index) => (
                <tr key={submission._id} className={``}>
                  <td className="">{index + 1}</td>
                  <td>{submission?.worker_name}</td>
                  <td className="truncate">{submission.task_title}</td>
                  <td className="">${submission.payable_amount}</td>
                  {submission.status === "approved" ? (
                    <td className="flex items-center gap-1">
                      <button
                        className="btn btn-sm bg-btnColor hover:bg-primaryColor text-white mr-2"
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        <BiDetail />
                      </button>
                      <p className="text-green-600 font-bold">
                        <IoCheckmarkDoneSharp />
                      </p>
                    </td>
                  ) : submission.status === "pending" ? (
                    <td className="flex items-center gap-1">
                      <button
                        className="btn btn-sm bg-btnColor hover:bg-primaryColor text-white mr-2"
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        <BiDetail />
                      </button>
                      <button
                        className="btn btn-sm btn-success text-white mr-2"
                        onClick={() =>
                          handleApprove(
                            submission._id,
                            submission.payable_amount,
                            submission.worker_email,
                            submission.task_title,
                            submission.buyer_name
                          )
                        }
                      >
                        <IoCheckmarkDoneSharp />
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() =>
                          handleReject(
                            submission._id,
                            submission.task_id,
                            submission.task_title,
                            submission.buyer_name,
                            submission.worker_email
                          )
                        }
                      >
                        <RxCrossCircled />
                      </button>
                    </td>
                  ) : (
                    submission.status === "rejected" && (
                      <td className="flex items-center gap-1">
                        <button
                          className="btn btn-sm bg-btnColor hover:bg-primaryColor text-white mr-2"
                          onClick={() => setSelectedSubmission(submission)}
                        >
                          <BiDetail />
                        </button>
                        <p className="text-red-600 font-bold">
                          <RxCrossCircled />
                        </p>
                      </td>
                    )
                  )}
                </tr>
              ))
            ) : (
              <tr className="border border-btnColor">
                <td colSpan="5" className="text-center text-gray-500">
                  No task submissions review.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedSubmission && (
        <dialog id="submissionModal" className="modal modal-open">
          <div className="modal-box">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setSelectedSubmission(null)}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold">Submission Details</h3>
            <p className="py-4">{selectedSubmission.submission_details}</p>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default BuyerHome;
