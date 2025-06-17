import ErrorThrower from "@/components/ErrorThrower";
import Loader from "@/components/Loader";
import { verifyCheckoutSession } from "@/lib/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();

  const {
    data: verificationSuccessStatus,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["verify-checkout-session"],
    queryFn: () => verifyCheckoutSession(sessionId as string),
  });

  const successfulPurchase = verificationSuccessStatus?.success;
  console.log(verificationSuccessStatus);
  console.log(successfulPurchase);

  useEffect(() => {
    setTimeout(() => {
      navigate("/my-learning");
    }, 6000);
  });
  return isLoading ? (
    <div className="flex justify-center items-center min-h-screen">
      <Loader />
    </div>
  ) : isError ? (
    <div>
      <ErrorThrower isError={isError} error={error as { message: string }} />
    </div>
  ) : (
    <div className="min-h-screen items-center justify-center">
      {successfulPurchase ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mt-4">Successful Purchase!</h2>
          <p className="text-gray-600 mt-2">
            Congratulations! Your payment has been processed successfully.
          </p>
          <p className="text-gray-600 mt-1">
            You'll be redirected to your courses shortly...
          </p>
          <button
            onClick={() => navigate("/my-learning")}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Back to My Learning
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-20 h-20 bg-red-100 rounded-full mx-auto flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mt-4">Purchase Failed.</h2>
          <p className="text-gray-600 mt-2">
            Something went wrong with your Purchase. If this continues, please
            contact support.
          </p>
          <p className="text-gray-600 mt-1">
            You'll be redirected to your courses shortly...
          </p>
          <button
            onClick={() => navigate("/my-learning")}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Back to My Learning
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccessPage;
