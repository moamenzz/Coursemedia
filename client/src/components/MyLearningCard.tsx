import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { CourseResponse } from "@/lib/apiRoutes";

interface CourseCardProps {
  course: CourseResponse;
}

const MyLearningCard: FC<CourseCardProps> = ({ course }) => {
  const onMoreOptions = (id: string) => {
    console.log("More options for Id toggled: ", id);
  };

  const onStartCourse = (id: string) => {
    console.log("Started course with Id: ", id);
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
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-base mb-1">{course?.title}</h3>
        <div className="text-sm text-gray-500 flex-grow">
          {course?.instructor?.user?.username}
        </div>
        <div className="mt-4 pt-2 border-t border-gray-200">
          <Button
            variant="default"
            className="w-full text-xs h-9 cursor-pointer"
            onClick={() => onStartCourse(course?._id as string)}
          >
            START COURSE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyLearningCard;
