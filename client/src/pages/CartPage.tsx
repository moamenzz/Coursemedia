import CartItem from "@/components/CartItem";
import ErrorThrower from "@/components/ErrorThrower";
import Loader from "@/components/Loader";
import { getCart } from "@/lib/apiRoutes";
import { calculateDiscountPercentage, formatPrice } from "@/utils/formatPrice";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TbBrandPaypalFilled } from "react-icons/tb";
import { toast } from "react-toastify";
import useStripe from "@/context/useStripe";

const CartPage = () => {
  const [coupon, setCoupon] = useState("");
  const { redirectToCheckout } = useStripe();

  const {
    data: cart,
    isLoading: isCartLoading,
    isError: isCartError,
    error: cartError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const cartItems = cart?.[0].courses || [];

  console.log(cartItems);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const totalPreviousPrice = cartItems.reduce(
    (total, item) => total + item.previousPrice,
    0
  );

  const handleApplyCoupon = () => {
    alert(`Applying coupon: ${coupon}`);
    setCoupon("");
  };

  const makePayment = async () => {
    try {
      if (cartItems.length < 0) {
        toast.error("Please add courses to your cart before making a payment.");
        return;
      }

      const coursesIds = cartItems.map((course) => course._id) as string[];

      console.log("CourseIds being sent:", coursesIds);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/payment/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coursesIds,
          }),
        }
      )
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then(({ url }) => {
          window.location.href = url;
        });

      // const { url } = await response.json();

      // window.location.href = url;
    } catch (error) {
      toast.error("Fehler beim Checkout-Prozess");
      console.error("Checkout-Fehler:", error);
    }
  };

  return isCartLoading ? (
    <div className="flex items-center justify-center min-h-full">
      <Loader />
    </div>
  ) : isCartError ? (
    <div className="w-full">
      <ErrorThrower isError={isCartError} error={cartError} />
    </div>
  ) : (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - Cart items */}
        <div className="flex-1">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <p className="text-lg font-medium">
              {cartItems.length} {cartItems.length === 1 ? "Course" : "Courses"}{" "}
              in Cart
            </p>
          </div>

          {cartItems.length > 0 ? (
            <div>
              {cartItems.map((item) => (
                <CartItem item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-6">
              <p className="text-xl text-gray-600">Your cart is empty.</p>
              <Link
                to="/explore/courses"
                className="mt-4 bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </div>

        {/* Right side - Checkout */}
        <div className="lg:w-80">
          <div className="bg-gray-50 p-6 rounded">
            <h2 className="text-lg font-medium mb-4">Total:</h2>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-3xl font-bold text-gray-800">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-500">
                <span className="line-through">
                  {formatPrice(totalPreviousPrice)}
                </span>
                <span className="text-green-700">
                  {calculateDiscountPercentage(totalPrice, totalPreviousPrice)}%
                  (OFF!)
                </span>
              </div>
            </div>

            <button
              className="w-full bg-purple-700 hover:bg-purple-800 text-white rounded py-3 font-medium flex items-center justify-center cursor-pointer"
              onClick={() => makePayment()}
            >
              Proceed to Checkout
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              You won't be charged yet
            </p>

            <div className="my-6 text-center">
              <span className="text-sm text-gray-500">OR</span>
            </div>

            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 rounded py-3 gap-1 font-medium flex items-center justify-center">
              <TbBrandPaypalFilled size={20} />
              PayPal
            </button>

            <div className="mt-6">
              <h3 className="font-medium mb-3">Promotions</h3>
              <div className="flex">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter Coupon"
                  className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-purple-700 text-white px-4 py-2 rounded-r text-sm font-medium hover:bg-purple-800"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
