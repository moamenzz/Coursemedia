import { CourseResponse } from "@/lib/apiRoutes";
import { formatDate } from "@/utils/formatDate";
import { Star } from "lucide-react";
import { FC } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { LuCaptions } from "react-icons/lu";
import formatLanguage from "@/utils/formatLanguage";
import { Link } from "react-router-dom";

interface CourseHeaderProps {
  course: CourseResponse;
}

const CourseHeader: FC<CourseHeaderProps> = ({ course }) => {
  const formattedReviews = new Intl.NumberFormat("en-US").format(
    course?.rating
  );
  return (
    <div className="bg-gray-900 text-white p-15">
      <div className="container mx-auto max-w-[60rem]">
        <div className="flex flex-col md:flex-row gap-8 ">
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{course?.title}</h1>
            <p className="text-lg mb-4">{course?.subtitle}</p>

            <div className="flex items-center gap-2 mb-2">
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-1.2">
                Bestseller
              </span>

              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">{course?.rating}</span>
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
                  ({formattedReviews}) ratings
                </span>
              </div>
              <span>{course.enrollees?.length} students</span>
            </div>

            <p className="mb-4 text-sm font-semibold">
              Created by{" "}
              <Link
                to={`/instructor/${course?.instructor?.user?._id}`}
                className="text-blue-300 underline"
              >
                {course?.instructor?.user?.username}
              </Link>
            </p>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <MdOutlineDateRange size={17} />
                <span>
                  Last updated {formatDate(course?.updatedAt as Date)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CiGlobe size={17} />
                <span>{formatLanguage(course?.courseLanguage)}</span>
              </div>
              <div className="flex items-center gap-1">
                <LuCaptions size={17} />
                <span>English, Arabic, Spanish and more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
