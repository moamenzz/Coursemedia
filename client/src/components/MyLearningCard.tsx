import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Ellipsis, Star } from "lucide-react";
import { CourseResponse, enrollUser } from "@/lib/apiRoutes";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { Separator } from "./ui/separator";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loader from "./Loader";
import ReviewModal from "./ReviewModal";

interface CourseCardProps {
  course: CourseResponse;
}

// Make this card dynamic for Courses already bought and for wishlisted courses

const MyLearningCard: FC<CourseCardProps> = ({ course }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();

  const { mutate: enrollUserMutation, isPending } = useMutation({
    mutationFn: () => enrollUser(course?._id as string),
    onError: () => {
      toast.error(
        "Failed to enroll in course, you will be redirected nonetheless. If this persists, contact support. "
      );
    },
    onSuccess: () => {
      toast.success("Successfully enrolled in course");
    },
  });

  const isUserEnrolled = Boolean(
    course.enrollees?.find((e) => e.toString() === user?._id)
  );

  const handleStartCourse = () => {
    navigate(`/player/${course._id}`);
    if (!isUserEnrolled) enrollUserMutation();
  };
  return (
    <div className="overflow-hidden flex flex-col h-full group">
      <div className="relative group-hover:">
        <img
          src={course?.cover}
          alt={course?.title}
          className="w-full h-48 object-cover"
        />
        <div className="dropdown dropdown-left absolute top-1 right-1 backdrop-blur-sm rounded-full cursor-pointer">
          <div
            tabIndex={0}
            role="button"
            className="bg-gray-400 rounded-full p-0.5"
          >
            <Ellipsis className="h-5 w-5 text-white" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-gray-700 text-white rounded-box z-1 w-52 p-2 shadow-sm"
          >
            {isUserEnrolled && (
              <div>
                <li>
                  <button
                    onClick={() => setIsReviewOpen(true)}
                    className="flex items-center gap-2 w-full"
                  >
                    <Star className="w-4" />
                    Leave a Review
                  </button>
                </li>
                <Separator className="bg-gray-600" />
              </div>
            )}
            <li className="text-red-500">
              <a>Report</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="font-medium text-base mb-1">{course?.title}</h2>
        <h3 className="text-sm text-gray-500 flex-grow">
          {course?.instructor?.user?.username}
        </h3>
        <div className="mt-4 pt-2 border-t border-gray-200">
          <Button
            variant="default"
            className={`w-full text-xs h-9 cursor-pointer ${
              isPending ? "pointer-events-none opacity-70" : ""
            }`}
            onClick={handleStartCourse}
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              "START COURSE"
            )}
          </Button>
        </div>
      </div>

      <ReviewModal
        isOpen={isReviewOpen}
        setIsOpen={setIsReviewOpen}
        course={course}
      />
    </div>
  );
};

export default MyLearningCard;
