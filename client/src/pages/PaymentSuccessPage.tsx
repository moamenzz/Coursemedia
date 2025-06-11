import { useEffect } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/my-learning");
    }, 6000);
  }, []);
  return (
    <div className="min-h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center">
          <IoIosCheckmarkCircle className="text-6xl text-green-500" />
          <h1 className="text-2xl font-bold mt-4 mb-6">Payment Successful</h1>
          <p className=" text-lg">Thank you for your purchase!</p>
          <p className="text-gray-500 mb-2">
            You'll found your course in your My-Courses section
          </p>
          <p className="text-gray-500">Redirecting...</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
