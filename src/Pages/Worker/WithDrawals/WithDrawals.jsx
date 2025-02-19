import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Auth/AuthContext";
import axiosInstance from "../../../Axios/useAxiosSecure";
import { Helmet } from "react-helmet";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";
import Aos from "aos";

const WithDrawals = () => {
  const { currentUser } = useContext(AuthContext);
  const [withdrawalCoin, setWithdrawalCoin] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const withdrawalAmount = (withdrawalCoin / 20).toFixed(2);

  const handleWithdraw = async () => {
    const withdrawalData = {
      worker_email: currentUser?.email,
      worker_name: currentUser?.name,
      withdrawal_coin: withdrawalCoin,
      withdrawal_amount: withdrawalAmount,
      payment_system: paymentSystem,
      account_number: accountNumber,
      withdraw_date: new Date().toISOString(),
      status: "pending",
    };

    try {
      const response = await axiosInstance.post("/withdrawals", {
        withdrawalData,
      });
      if (response.data.insertedId) {
        Swal.fire({
          title: "Success",
          text: "Withdrawal request submitted successfully!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setWithdrawalCoin(0);
        setPaymentSystem("");
        setAccountNumber("");
      }
    } catch {
      Swal.fire({
        title: "Error",
        text: "Something went wrong! Please try again later.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  useEffect(() => {
    Aos.init({
      once: true,
      offset: 300,
      duration: 2000,
      delay: 300,
    });
  }, [currentUser]);

  return (
    <div className="min-h-screen py-8 bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50">
      <Helmet>
        <title>Withdrawals Request || Worker</title>
      </Helmet>
      <DashboardTitle title={"Withdraw Form"} />
      <br />
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-10 space-y-8 border-t-4 border-orange-500"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="text-center sm:text-left">
            <p className="text-sm lg:text-base text-gray-700">
              Total Coins:{" "}
              <span className="text-orange-600">{currentUser?.coins}</span>{" "}
              coins
            </p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm lg:text-base text-gray-700">
              Equivalent Withdrawal Amount:{" "}
              <span className="text-orange-600">
                ${(currentUser?.coins / 20).toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        {currentUser?.coins < 300 ? (
          <p
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            className="text-center text-red-500 text-xs lg:text-sm"
          >
            Insufficient coins to withdraw. Minimum 300 coins required.
          </p>
        ) : (
          <form
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            onSubmit={(e) => {
              e.preventDefault();
              handleWithdraw();
            }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Coins to Withdraw:
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                  value={withdrawalCoin}
                  onChange={(e) => setWithdrawalCoin(Number(e.target.value))}
                  min={0}
                  max={currentUser?.coins}
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Withdrawal Amount ($):
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none bg-gray-100"
                  value={withdrawalAmount}
                  readOnly
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Select Payment System:
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                  value={paymentSystem}
                  onChange={(e) => setPaymentSystem(e.target.value)}
                  required
                >
                  <option value="">Select Payment System</option>
                  <option value="Bkash">Bkash</option>
                  <option value="Rocket">Rocket</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Account Number:
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-lg shadow-md hover:bg-orange-700 transition duration-300 focus:outline-none text-sm md:text-base lg:text-xl"
            >
              Withdraw
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default WithDrawals;
