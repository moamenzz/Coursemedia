import React from "react";
import { Star } from "lucide-react";
import { CourseResponse } from "@/lib/apiRoutes";
import { Link } from "react-router-dom";

export interface CourseCardProps {
  course: CourseResponse;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // Format the price to display with 2 decimal places and proper currency
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(course?.price);

  const formattedPreviousPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(course?.previousPrice);

  // Format the rating count with commas
  const formattedReviews = new Intl.NumberFormat("en-US").format(
    course?.rating
  );

  return (
    <Link
      to={`/courses/${course?._id}`}
      className="flex flex-col w-full bg-white hover:shadow-lg transition-shadow cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
        <img
          src={course?.cover}
          alt={course?.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col mt-1">
        {/* Title */}
        <h3 className="font-bold text-lg line-clamp-2 mb-1">{course?.title}</h3>

        {/* Instructor */}
        <p className="text-gray-600 mb-1">
          {course?.instructor?.user?.username}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-1">
          <span className="text-amber-500 font-bold text-sm mr-1">
            {course?.rating?.toFixed(1)}
          </span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Star
                key={index}
                size={12}
                className={`${
                  index < Math.floor(course?.rating)
                    ? "fill-amber-500 text-amber-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({formattedReviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-base">{formattedPrice}</span>
          {course?.previousPrice && (
            <span className="text-gray-500 text-sm line-through">
              {formattedPreviousPrice}
            </span>
          )}
        </div>

        {/* Bestseller tag */}
        {course?.isBestSeller && (
          <div className="mt-2">
            <span className="bg-[#ECEB98] text-yellow-800 text-sm font-medium px-3 py-1">
              Bestseller
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CourseCard;
