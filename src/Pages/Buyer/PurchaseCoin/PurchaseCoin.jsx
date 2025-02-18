import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Auth/AuthContext";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";
import {
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaCoins,
  FaDollarSign,
} from "react-icons/fa";
import Aos from "aos";

const coinPackages = [
  { coins: 10, price: 1 },
  { coins: 150, price: 10 },
  { coins: 500, price: 20 },
  { coins: 1000, price: 35 },
];

const PurchaseCoin = () => {
  const navigate = useNavigate();
  const { user, currentUser } = useContext(AuthContext);

  const handlePurchase = (coins, price) => {
    navigate("/dashboard/paymentStripe", {
      state: { coins, price, email: user?.email },
    });
  };
  useEffect(() => {
    Aos.init({
      once: true,
      duration: 1500,
      delay: 300,
      offset: 200,
    });
  }, [currentUser, user]);

  return (
    <div className="px-2">
      <Helmet>
        <title>Purchase Coins || Buyer</title>
      </Helmet>
      <DashboardTitle title={"Purchase Coins"} />
      {/* Current Balance Section */}
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="mt-6 text-center bg-orange-50 border border-orange-200 rounded-lg p-4"
      >
        <h3 className="text-lg font-semibold text-primaryColor">
          Your Current Coin Balance
        </h3>
        <p className="text-2xl font-bold text-primaryColor">
          {currentUser?.coins || 0} Coins
        </p>
      </div>
      {/* Coin Packages Section */}
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
      >
        {coinPackages.map((pkg, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-md p-6 text-center hover:-translate-y-2 transition-transform duration-500 cursor-pointer bg-gradient-to-br from-orange-50 to-white"
            onClick={() => handlePurchase(pkg.coins, pkg.price)}
          >
            <div className="flex justify-center items-center mb-4 text-btnColor">
              <FaCoins size={40} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 ">
              {pkg.coins} Coins
            </h2>
            <p className="text-lg text-gray-500 mt-2">=</p>
            <p className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
              {pkg.price}
              <FaDollarSign className="text-btnColor" size={20} />
            </p>
          </div>
        ))}
      </div>
      {/* Why Purchase Coins Section */}
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="mt-8 text-center"
      >
        <h3 className="text-lg font-semibold text-gray-700">
          Why Purchase Coins?
        </h3>
        <p className="text-gray-600 mt-2">
          Use coins to unlock exclusive features, post tasks, and boost your
          visibility as a buyer. The more coins you purchase, the more you save!
        </p>
      </div>
      {/* FAQ Section */}
      <div className="mt-10">
        <DashboardTitle title={" Frequently Asked Questions"} />
        <br />
        <div className="join join-vertical w-full">
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            className="collapse collapse-arrow join-item border-base-300 border"
          >
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              How do I use the purchased coins?
            </div>
            <div className="collapse-content">
              <p>
                You can use coins to post tasks, upgrade your profile, or unlock
                premium features.
              </p>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            className="collapse collapse-arrow join-item border-base-300 border"
          >
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              Are there any additional charges?
            </div>
            <div className="collapse-content">
              <p>No, the price you see here is the final amount you`ll pay.</p>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            className="collapse collapse-arrow join-item border-base-300 border"
          >
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              What happens if I don`t use my coins?
            </div>
            <div className="collapse-content">
              <p> Unused coins remain in your account and do not expire.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Payment Method Icons Section */}
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="mt-6 flex justify-center items-center gap-6"
      >
        <div>
          <FaCcVisa size={40} style={{ color: "#1A1F71" }} />
        </div>
        <div>
          <FaCcMastercard size={40} style={{ color: "#EB001B" }} />
        </div>
        <div>
          <FaCcPaypal size={40} style={{ color: "#003087" }} />
        </div>
      </div>
    </div>
  );
};

export default PurchaseCoin;
