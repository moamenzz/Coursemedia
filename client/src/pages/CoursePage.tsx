import CourseHeader from "@/components/CourseHeader";
import CoursePreview from "@/components/CoursePreview";
import ErrorThrower from "@/components/ErrorThrower";
import Loader from "@/components/Loader";
import { getCourse, getCourseReviews, ReviewResponse } from "@/lib/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Lock, PlayCircle } from "lucide-react";
import truncateDescription from "@/utils/truncuateDescription";
import { useState } from "react";
import ReviewsDisplay from "@/components/ReviewsDesplay";
import FeaturedReview from "@/components/FeaturedReview";

const CoursePage = () => {
  const { courseId } = useParams();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const {
    data: course,
    isLoading: isCourseLoading,
    isError: isCourseError,
    error: courseError,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourse(courseId!),
  });

  const {
    data: reviews,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
    error: reviewsError,
  } = useQuery({
    queryKey: ["user-reviews"],
    queryFn: () => getCourseReviews(course?._id as string),
    enabled: !!course,
  });

  const featuredReview = Array.isArray(reviews)
    ? reviews.find((review) => review.featured === true)
    : undefined;

  const isLoading = isCourseLoading || isReviewsLoading;
  const isError = isCourseError || isReviewsError;
  const error = courseError || reviewsError;

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
            <div className="flex items-center md:absolute md:top-[6%] md:right-[0%] lg:top-[6%] lg:right-[14%]">
              <CoursePreview course={course} />
            </div>

            <div className="container mx-auto py-16 md:py-10 max-w-[60rem] md:pr-[250px] space-y-6">
              {/* What you'll learn */}
              <div>
                <h1 className="text-2xl font-bold pb-3">What you'll learn</h1>

                <div>
                  {course.courseObjectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </div>
              </div>

              {/* TODO: Make this course includes section */}
              {/* TODO: Make Curriculum open video player if the lecture is available for free preview */}

              {/* Course Content */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                </CardHeader>
                <CardContent>
                  {course?.curriculum?.map((curriculumItem) => (
                    <li
                      key={curriculumItem?._id}
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

              {/* Who is this course for section */}
              <div>
                <h1 className="text-2xl font-bold pb-3">
                  Who is this course for
                </h1>

                <div>
                  {course.courseWhoIsThisFor.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h1 className="text-2xl font-bold pb-3">Description</h1>

                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {isDescriptionExpanded
                      ? course?.description
                      : truncateDescription(course?.description as string)}
                  </p>

                  {course?.description && course?.description?.length > 300 && (
                    <div
                      onClick={() =>
                        setIsDescriptionExpanded(!isDescriptionExpanded)
                      }
                      className="inline-flex items-center gap-1 mt-3 text-purple-600 hover:text-purple-700 font-medium text-sm"
                    >
                      {isDescriptionExpanded ? (
                        <button className="inline-flex items-center gap-1 cursor-pointer">
                          Show less <ChevronUp className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="inline-flex items-center gap-1 cursor-pointer">
                          Show more <ChevronDown className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* TODO: Let instructors view reviews from their dashboard and be able to feature one of the reviews */}

              {/* Featured Review */}
              {Array.isArray(reviews) &&
                reviews.find((review) => review.featured) && (
                  <div>
                    <h1 className="text-2xl font-bold pb-3">Featured Review</h1>

                    <FeaturedReview
                      featuredReview={featuredReview as ReviewResponse}
                    />
                  </div>
                )}

              {/* All Reviews */}
              {Array.isArray(reviews) && reviews.length > 0 && (
                <div>
                  <h1 className="text-2xl font-bold pb-3">All Reviews</h1>

                  <ReviewsDisplay reviews={reviews as ReviewResponse[]} />
                </div>
              )}

              {/* Instructor Details */}
              {/* <div>
                <h1 className="text-2xl font-bold pb-3">Instructor</h1>

                <InstructorCard />
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
