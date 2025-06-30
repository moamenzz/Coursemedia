import React, { useState } from "react";
import {
  Star,
  MessageCircle,
  Heart,
  Flag,
  Search,
  MoreVertical,
  Reply,
  Pin,
  PinOff,
  Trash,
} from "lucide-react";
import {
  answerReview,
  CourseResponse,
  deleteReviewAnswer,
  featureReview,
  getInstructorReviews,
  ReviewResponse,
} from "@/lib/apiRoutes";
import { formatCourseRating } from "@/utils/formatCourseRating";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import ErrorThrower from "@/components/ErrorThrower";
import { formatDate } from "@/utils/formatDate";
import { toast } from "react-toastify";
import queryClient from "@/config/queryClient";

interface ReviewPageProps {
  courses: CourseResponse[];
}
const ReviewsPage: React.FC<ReviewPageProps> = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: getInstructorReviews,
  });

  const selectedCoursesIsAll = selectedCourse === "all";

  const { mutate: handleFeature, isPending: isFeaturePending } = useMutation({
    mutationFn: featureReview,
    onError: () => {
      toast.error("Failed to feature review");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  const { mutate: handleAnswerReview, isPending: isAnswerPending } =
    useMutation({
      mutationFn: answerReview,
      onError: () => {
        toast.error("Failed to reply to review");
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["reviews"] });
      },
    });

  const { mutate: handleDeleteAnswer, isPending: isAnswerDeletePending } =
    useMutation({
      mutationFn: deleteReviewAnswer,
      onError: () => {
        toast.error("Failed to delete reply");
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["reviews"] });
      },
    });

  const filteredReviews = reviews?.filter((review) => {
    const matchesCourse =
      selectedCourse === "all" || review.course._id === selectedCourse;
    const matchesRating =
      filterRating === null || review.rating === filterRating;
    const matchesSearch =
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.user.username.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCourse && matchesRating && matchesSearch;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return isLoading ? (
    <div className="flex justify-center items-center min-h-screen">
      <Loader />
    </div>
  ) : isError ? (
    <div className="flex min-h-screen items-center">
      <ErrorThrower isError={isError} error={error} />
    </div>
  ) : (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Course Reviews
          </h1>
          <p className="text-gray-600">
            Manage your course reviews and interact with your students
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {selectedCoursesIsAll ? "Overall" : "Course"} Reviews
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {selectedCoursesIsAll
                    ? reviews?.length
                    : filteredReviews?.length}
                </p>
              </div>
              <MessageCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Average {selectedCoursesIsAll ? "Overall" : "Course"} Rating
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {selectedCoursesIsAll
                    ? formatCourseRating(reviews as ReviewResponse[])
                    : formatCourseRating(filteredReviews as ReviewResponse[])}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-500 fill-current" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Overall Featured Reviews
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {reviews?.filter((r) => Boolean(r.featured)).length}
                </p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {selectedCoursesIsAll ? "Overall" : "Course"} Replies
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {selectedCoursesIsAll
                    ? reviews?.filter(
                        (review) =>
                          review?.instructorReply?.hasReply &&
                          review?.instructorReply?.reply
                      ).length
                    : reviews?.filter(
                        (review) =>
                          review.course._id === selectedCourse &&
                          review?.instructorReply?.hasReply &&
                          review?.instructorReply?.reply
                      ).length}
                </p>
              </div>
              <Reply className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Course Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Courses</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <select
                value={filterRating || ""}
                onChange={(e) =>
                  setFilterRating(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative flex items-center">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nach Reviews oder Studentennamen suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews?.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-lg shadow-sm border overflow-hidden"
            >
              {review.featured && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2">
                  <div className="flex items-center text-white text-sm font-medium">
                    <Pin className="w-4 h-4 mr-2" />
                    Featured Review
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {review.user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {review.user.username}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-600">•</span>
                        <span className="text-sm text-gray-600">
                          {review && formatDate(review.createdAt)}
                        </span>
                      </div>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mt-2">
                        {review.course.title}
                      </span>
                    </div>
                  </div>

                  {/* Actions Menu */}
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-sm btn-circle"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <button
                          onClick={() =>
                            handleFeature({
                              reviewId: review._id,
                              courseId: review.course._id as string,
                            })
                          }
                          disabled={isFeaturePending}
                          className="flex items-center"
                        >
                          {review.featured ? (
                            <PinOff className="w-4 h-4 mr-2" />
                          ) : (
                            <Pin className="w-4 h-4 mr-2" />
                          )}
                          {review.featured
                            ? "Remove Feature"
                            : "Feature Review"}
                        </button>
                      </li>
                      <li>
                        <button className="flex items-center text-red-500">
                          <Flag className="w-4 h-4 mr-2" />
                          Report as problematic
                        </button>
                      </li>
                      {review?.instructorReply?.hasReply && (
                        <li>
                          <button
                            className="flex items-center text-red-500"
                            onClick={() =>
                              handleDeleteAnswer({
                                reviewId: review._id,
                                courseId: review.course._id as string,
                              })
                            }
                            disabled={isAnswerDeletePending}
                          >
                            <Trash className="w-4 h-4 mr-2" />
                            Delete Answer
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Review Content */}
                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                </div>

                {/* Existing Reply */}
                {review?.instructorReply?.hasReply &&
                  review.instructorReply.reply && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4 border-l-4 border-blue-500">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                          Y
                        </div>
                        <span className="font-medium text-gray-900">
                          Your reply
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          • {formatDate(review.instructorReply.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 ml-11">
                        {review.instructorReply.reply}
                      </p>
                    </div>
                  )}

                {/* Reply Form */}
                {replyingTo === review._id ? (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                    />
                    <div className="flex justify-end space-x-2 mt-3">
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          handleAnswerReview({
                            reviewId: review._id,
                            courseId: review.course._id as string,
                            reply: replyText,
                          });
                          setReplyingTo(null);
                        }}
                        disabled={!replyText.trim() || isAnswerPending}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4 pt-4 border-t">
                    <button
                      onClick={() => {
                        if (review?.instructorReply?.hasReply) {
                          setReplyText(review?.instructorReply?.reply);
                        } else {
                          setReplyText("");
                        }
                        setReplyingTo(review._id);
                      }}
                      className="flex items-center text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {review?.instructorReply?.hasReply ? "Edit" : "Answer"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredReviews?.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Reviews Found
              </h3>
              <p className="text-gray-600">
                There are no reviews that match your filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
