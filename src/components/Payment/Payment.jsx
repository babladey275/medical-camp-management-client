import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const location = useLocation();
  const { camp } = location.state || {};

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold text-center mt-8 mb-16">
        Payment for {camp?.campName}
      </h2>
      <div className="w-full max-w-2xl">
        <Elements stripe={stripePromise}>
          <CheckoutForm camp={camp} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
