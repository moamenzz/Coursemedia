import { Heart } from "lucide-react";
import { FC, useState } from "react";
import { Alert, AlertDescription } from "./ui/alert";
import {
  addToCart,
  CourseResponse,
  createCheckoutSession,
  getCart,
} from "@/lib/apiRoutes";
import VideoPlayer from "./VideoPlayer";
import { calculateDiscountPercentage, formatPrice } from "@/utils/formatPrice";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import ErrorThrower from "./ErrorThrower";
import { useNavigate } from "react-router-dom";
import queryClient from "@/config/queryClient";

interface CoursePreviewProps {
  course: CourseResponse;
}

const CoursePreview: FC<CoursePreviewProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg w-full md:max-w-[22rem]">
      <div className="relative">
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          {course.curriculum.length > 0 ? (
            <VideoPlayer
              url={course.curriculum.find((c) => c.freePreview)?.url || ""}
              width="450px"
              height="200px"
            />
          ) : (
            "No free preview enabled"
          )}
        </div>
      </div>

      <CourseEnrollment course={course} />
    </div>
  );
};

const CourseEnrollment: FC<CoursePreviewProps> = ({ course }) => {
  const [couponCode, setCouponCode] = useState("CP130525");
  const [buyingNow, setIsBuyingNow] = useState(false);
  const navigate = useNavigate();

  const {
    data: cart,
    isLoading: isCartLoading,
    isError: isCartError,
    error: cartError,
  } = useQuery({
    queryKey: ["cart-items"],
    queryFn: getCart,
  });

  const isAddedToCart = Boolean(
    cart?.[0]?.courses?.find((c) => c._id === course._id)
  );

  const makePayment = async () => {
    try {
      setIsBuyingNow(true);

      const courseId = course._id;
      console.log(courseId);

      if (courseId) {
        const response = await createCheckoutSession([courseId]);
        console.log(response);

        window.location.href = response.url;
        setIsBuyingNow(false);
      }
    } catch (error) {
      toast.error("Fehler beim Checkout-Prozess");
      console.error("Checkout-Fehler:", error);
    } finally {
      setIsBuyingNow(false);
    }
  };

  const {
    mutate: addToCartMutation,
    isPending: addToCartPending,
    error: addToCartError,
  } = useMutation({
    mutationFn: addToCart,
    onError: () => {
      toast.error(addToCartError?.message || "Failed to add to cart");
    },
    onSuccess: () => {
      toast.success("Course added to cart successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    },
  });

  return isCartLoading ? (
    <div className="flex items-center justify-center min-h-full">
      <Loader />
    </div>
  ) : isCartError ? (
    <div className="w-full">
      <ErrorThrower isError={isCartError} error={cartError} />
    </div>
  ) : (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-2xl font-bold">
            {formatPrice(course.price)}
          </span>
          {course.previousPrice && (
            <div>
              <span className="line-through text-gray-500 ml-2">
                {formatPrice(course.previousPrice)}
              </span>
              <span className="ml-2 text-sm text-gray-700">
                (%
                {calculateDiscountPercentage(
                  course.price,
                  course.previousPrice
                )}{" "}
                OFF!)
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <button
          className={`btn btn-primary ${isAddedToCart ? "opacity-70" : ""}`}
          onClick={() => {
            if (isAddedToCart) {
              navigate("/cart");
            } else {
              addToCartMutation(course._id as string);
            }
          }}
          disabled={addToCartPending}
        >
          {addToCartPending ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : isAddedToCart ? (
            "Go to cart"
          ) : (
            "Add to cart"
          )}
        </button>
        <button
          className={`${buyingNow ? "opacity-70" : ""} btn btn-outline`}
          disabled={buyingNow}
          onClick={makePayment}
        >
          {buyingNow ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            "Buy now"
          )}
        </button>
        <button className="btn btn-outline tooltip" data-tip="Add to wishlist">
          <Heart size={16} />
        </button>
      </div>

      <div className="text-sm font-semibold text-center mb-4">
        <p>30-Day Money-Back Guarantee</p>
        <p>Full Lifetime Access</p>
      </div>

      {couponCode && (
        <Alert className="bg-gray-100 border border-gray-200 mb-4">
          <AlertDescription className="text-sm text-center text-purple-600">
            {couponCode} is applied
            <div className="text-xs text-gray-500">Udemy coupon</div>
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Coupon"
            className="input input-bordered border"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button className="btn btn-primary rounded-l-none">Apply</button>
        </div>
      </div>

      <div className="divider my-2">OR</div>

      <div className="mb-4 space-y-1">
        <h3 className="font-bold mb-1">
          Subscribe to Coursemedia's top courses
        </h3>
        <p className="text-sm mb-2">
          Get this course, plus 13,000+ of our top-rated courses, with
          Coursemedia business.
        </p>
        <button
          className="btn btn-outline btn-primary w-full"
          onClick={() => {
            toast.info("Coming soon!");
          }}
        >
          Try Coursemedia business for free
        </button>
        <p className="text-xs text-center mt-2">
          Starting at £204.00 per month after trial
        </p>
        <p className="text-xs text-center">Cancel anytime</p>
      </div>
    </div>
  );
};

export default CoursePreview;
