import queryClient from "@/config/queryClient";
import { CourseResponse, removeFromCart } from "@/lib/apiRoutes";
import { formatLevel } from "@/utils/formatLevel";
import { formatPrice } from "@/utils/formatPrice";
import { useMutation } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { FC } from "react";
import { toast } from "react-toastify";

interface CartItemProps {
  item: CourseResponse;
}
const CartItem: FC<CartItemProps> = ({ item }) => {
  const {
    mutate: removeFromCartMutation,
    isPending: isRemoveFromCartPending,
    error: removeFromCartError,
  } = useMutation({
    mutationFn: removeFromCart,
    onError: () => {
      toast.error(removeFromCartError?.message || "Failed to remove from cart");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <div>
      <div key={item._id} className="flex border-b border-gray-200 py-6">
        <div className="w-24 h-16 flex-shrink-0">
          <img
            src={item.cover}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="ml-4 flex-1">
          <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
          <p className="text-sm text-gray-600">
            By {item?.instructor?.user?.username}, {item.instructor.role}
          </p>

          {item.isBestSeller && (
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-sm font-medium mt-1">
              Bestseller
            </span>
          )}

          <div className="flex items-center mt-1">
            <span className="text-amber-500 font-bold text-sm mr-1">
              {item?.rating.toFixed(1)}
            </span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Star
                  key={index}
                  size={12}
                  className={`${
                    index < Math.floor(item?.rating)
                      ? "fill-amber-500 text-amber-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({new Intl.NumberFormat("en-US").format(item.rating)})
            </span>
          </div>

          <div className="text-sm text-gray-600 mt-1">
            {300} total hours • {item.curriculum.length} lectures •{" "}
            {formatLevel(item.level)}
          </div>
        </div>

        <div className="ml-4 flex flex-col items-end">
          <span className="text-lg font-bold text-purple-700">
            {formatPrice(item.price)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            {formatPrice(item.previousPrice)}
          </span>

          <div className="mt-4 flex flex-col items-end">
            <button
              onClick={() => removeFromCartMutation(item._id as string)}
              className="text-sm text-purple-700 hover:text-purple-900 mb-2 cursor-pointer"
            >
              {isRemoveFromCartPending ? "Removing..." : "Remove from Cart"}
            </button>
            <button className="text-sm text-purple-700 hover:text-purple-900">
              Move to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
