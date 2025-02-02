import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import { useLocation, useNavigate } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const PaymentStripe = () => {
  //   const { state } = useLocation();
  //   const navigate = useNavigate();
  //   const { coins, price } = state || {};

  //   const handleDummyPayment = () => {
  //     // Simulate a successful payment
  //     alert(`Payment Successful! You purchased ${coins} coins for $${price}.`);
  //     // Call API to save payment info and update coin balance (pseudo-code)
  //     /*
  //         fetch('/api/save-payment', {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({
  //             userId: "buyer-id",
  //             coins,
  //             amount: price,
  //             date: new Date(),
  //           }),
  //         });
  //       */
  //     navigate("/dashboard");
  //   };

  return (
    <div className="">
      <Helmet>
        <title>Payment || Buyer</title>
      </Helmet>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default PaymentStripe;
