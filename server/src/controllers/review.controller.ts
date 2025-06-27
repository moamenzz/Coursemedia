import { NOT_FOUND } from "../constants/HttpStatusCode";
import CourseModel from "../models/course.model";
import ReviewModel from "../models/review.model";
import { reviewSchema } from "../schemas/review.schema";
import { leaveReview } from "../services/review.service";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchError";

export const getCourseReviews = catchErrors(async (req, res) => {
  const courseId = req.params.courseId;

  const course = await CourseModel.findById(courseId);
  appAssert(course, NOT_FOUND, "Course not found");

  const reviews = await ReviewModel.find({ course: courseId });

  if (reviews.length <= 0) return res.status(200).json("No reviews found");
  res.status(200).json(reviews);
});

export const handleLeaveReview = catchErrors(async (req, res) => {
  const userId = req.userId;
  const courseId = req.params.courseId;
  const data = reviewSchema.parse(req.body);

  const { review } = await leaveReview(userId, courseId, data);

  res.status(200).json(review);
});
