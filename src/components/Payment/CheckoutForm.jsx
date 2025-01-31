import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({ camp }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const fees = camp.fees;

  useEffect(() => {
    if (fees > 0) {
      axiosSecure.post("/create-payment-intent", { fees: fees }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, fees]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
    }

    // Confirm payment
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
      toast.error("Payment confirmation failed.");
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // Now save the payment in the database
        const payment = {
          email: user.email,
          campName: camp.campName,
          fees,
          transactionId: paymentIntent.id,
          date: new Date(),
          registerId: camp._id,
          paymentStatus: "Paid",
          confirmStatus: "Pending",
        };

        const res = await axiosSecure.post("/payments", payment);

        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Thank You! Your payment has been processed",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full"
    >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn hover:bg-[#3986d7] bg-[#277dc3] text-white text-xl my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>

      {transactionId && (
        <p className="text-green-600 font-semibold">
          Your transaction id: {transactionId}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
