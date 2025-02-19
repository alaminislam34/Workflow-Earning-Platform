import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import axiosInstance from "../../../../Axios/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Auth/AuthContext";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const { coins, price } = location.state || {};
  const { user, currentUser, refetch } = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (coins && price && user?.email) {
      axiosInstance
        .post("/create-payment-intent", { coins, price, email: user?.email })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
        });
    }
  }, [coins, price, user?.email]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prevent multiple submissions
    if (!stripe || !elements || isProcessing) {
      return;
    }

    setIsProcessing(true); // Set processing state to true
    setError(""); // Clear previous errors

    const card = elements.getElement(CardElement);
    if (card === null) {
      setIsProcessing(false);
      setError("Card element not found.");
      return;
    }

    try {
      // Confirm the card payment
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        });

      if (confirmError) {
        setError(confirmError.message);
        setIsProcessing(false);
        return;
      }

      // Payment success - Update server-side data
      try {
        const notification = {
          buyer_email: user?.email,
          coins_purchased: coins,
          amount_paid: price,
          payment_date: new Date(),
          transaction_id: paymentIntent.id,
          payment_status: "Success",
        };

        // Send notification to the server
        await axiosInstance.post("/paymentHistory", notification);

        // Update coins for the user
        const newCoin = parseInt(currentUser?.coins || 0) + coins;
        await axiosInstance.patch("/coinModify", {
          email: currentUser?.email,
          newCoin,
        });

        // Show success message
        Swal.fire({
          title: "Payment Successful!",
          text: "Your payment was successful and your coins have been updated.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/dashboard/purchase");
      } catch (serverError) {
        console.error("Error updating server data:", serverError);
        Swal.fire({
          title: "Error!",
          text: "Payment succeeded, but there was an issue updating your account. Please contact support.",
          icon: "error",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Payment process error:", error);
      setError(
        "An unexpected error occurred during payment. Please try again."
      );
    } finally {
      // Clear the card input and reset processing state
      card.clear();
      refetch();
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center w-full my-auto h-[70vh]">
      <Helmet>
        <title>Payment stripe</title>
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg w-full mx-auto p-6 border rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center">Payment Information</h2>
        <div className="flex justify-center items-center">
          {error ? (
            <small className="text-red-600 text-center inline-block">
              {error}
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                  padding: "12px 16px",
                  borderRadius: "8px",
                  backgroundColor: "#f7fafc",
                  border: "1px solid #e2e8f0",
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-full py-3 cursor-pointer bg-btnColor text-white font-semibold rounded-lg shadow-md hover:bg-primaryColor transition-all disabled:opacity-50 ${
              !stripe || !clientSecret || isProcessing
                ? "cursor-not-allowed"
                : ""
            }`}
            disabled={!stripe || !clientSecret || isProcessing}
          >
            {isProcessing ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              "Pay Now"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
