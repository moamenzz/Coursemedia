import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CourseResponse } from "@/lib/apiRoutes";
import formatCategory from "@/utils/formatCategory";
import { Star } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface ListCourseCardProps {
  course: CourseResponse;
}

const ListCourseCard: FC<ListCourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
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
    <Card
      onClick={() => navigate(`/explore/courses/${course._id}`)}
      className="cursor-pointer"
      key={course._id}
    >
      <CardContent className="flex gap-4 p-4">
        <div className="w-48 h-32 flex-shrink-0">
          <img src={course?.cover} className="w-ful h-full object-cover" />
        </div>

        <div className="flex-1">
          <CardTitle className="font-bold text-base line-clamp-2 mb-1">
            {course?.title}
          </CardTitle>

          <p className="text-sm text-gray-600 mb-1">{course.description}</p>

          <p className="text-sm text-gray-600 mb-1">
            {formatCategory(course.category)}
          </p>

          <p className="text-sm text-gray-600 mb-1">
            Instructor: {course?.instructor?.user?.username}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-1">
            <span className="text-amber-500 font-bold text-sm mr-1">
              {course?.rating.toFixed(1)}
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

          {/* Bestseller tag */}
          {course?.isBestSeller && (
            <div className="mt-2">
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-1.2">
                Bestseller
              </span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mt-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base">{formattedPrice}</span>
            {course?.previousPrice && (
              <span className="text-gray-500 text-sm line-through">
                {formattedPreviousPrice}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListCourseCard;
