import CourseHeader from "@/components/CourseHeader";
import CoursePreview from "@/components/CoursePreview";
import ErrorThrower from "@/components/ErrorThrower";
import Loader from "@/components/Loader";
import { getCourse } from "@/lib/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IoIosCheckmark } from "react-icons/io";
import { Lock, PlayCircle } from "lucide-react";

const CoursePage = () => {
  const { courseId } = useParams();

  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["course"],
    queryFn: () => getCourse(courseId!),
  });

  const handleFreePreview = () => {};
  return isLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  ) : isError ? (
    <div className="flex items-center justify-center min-h-screen">
      <ErrorThrower isError={isError} error={error as { message: string }} />
    </div>
  ) : (
    <div className="min-h-screen">
      <div className="mx-auto">
        {course && (
          <div className="relative">
            <div>
              <CourseHeader course={course} />
            </div>
            <div className="flex items-center md:absolute md:top-[17%] md:right-[1.5%] lg:top-[12%] lg:right-[14%]">
              <CoursePreview course={course} />
            </div>

            <div className="container mx-auto py-16 md:py-10 max-w-[60rem] md:pr-[250px] space-y-6">
              {/* Description */}
              <div>
                <h1 className="text-2xl font-bold pb-3">Description</h1>

                <div>{course.description}</div>
              </div>

              {/* What you'll learn */}
              <Card className="mb-8 p-4">
                <CardHeader>
                  <CardTitle>What you'll learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {course?.courseObjectives?.map((objective, index) => (
                      <li key={index} className="flex items-center">
                        <IoIosCheckmark size={30} />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Course Content */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                </CardHeader>
                <CardContent>
                  {course?.curriculum?.map((curriculumItem, index) => (
                    <li
                      className={`${
                        curriculumItem?.freePreview
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      } flex items-center mb-4`}
                      onClick={
                        curriculumItem?.freePreview
                          ? () => {
                              handleFreePreview();
                            }
                          : undefined
                      }
                    >
                      {curriculumItem?.freePreview ? (
                        <PlayCircle className="mr-2 h-4 w-4" />
                      ) : (
                        <Lock className="mr-2 h-4 w-4" />
                      )}
                      <span>{curriculumItem?.title}</span>
                    </li>
                  ))}
                </CardContent>
              </Card>

              {/* Requirements */}
              <div>
                <h1 className="text-2xl font-bold pb-3">Requirements</h1>

                <div>
                  {course.courseRequirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </div>
              </div>

              {/* Featured Review */}
              <div></div>

              {/* Instructor Details */}
              <div></div>

              {/* All Reviews */}
              <div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
