import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../Axios/useAxiosSecure";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../Auth/AuthContext";
import { Helmet } from "react-helmet";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";
import Aos from "aos";

const PaymentHistory = () => {
  const { user, theme } = useContext(AuthContext);

  const { data: payments } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await axiosInstance(`/paymentHistory?email=${user?.email}`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: !!user?.email,
  });
  useEffect(() => {
    Aos.init({
      once: true,
      offset: 300,
      duration: 2000,
      delay: 300,
    });
  }, [payments, user]);

  return (
    <div className="py-8 px-2">
      <Helmet>
        <title>Tasks List || Buyer</title>
      </Helmet>
      <DashboardTitle title={"Payment History"} />

      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className={`${
          theme === "light" ? "bg-white" : "bg-gray-800 text-white"
        } overflow-x-auto border-t-4 border-primaryColor rounded-lg shadow-lg`}
      >
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-300 text-gray-700">
              <th>#</th>
              <th>Transaction ID</th>
              <th>Coins Purchased</th>
              <th>Amount Paid (USD)</th>
              <th>Payment Date</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {payments?.length > 0 ? (
              payments?.map((payment, index) => (
                <tr key={payment._id} className="*:px-4 *:py-2">
                  <td className="">{index + 1}</td>
                  <td className="">{payment.transaction_id}</td>
                  <td className="">${payment.coins_purchased}</td>
                  <td className="">${payment.amount_paid}</td>
                  <td className="">
                    {new Date(payment.payment_date).toLocaleDateString()}
                  </td>
                  <td className="text-green-500 ">
                    <IoCheckmarkDoneSharp className="w-full mx-auto text-xl lg:text-2xl" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No payment history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
