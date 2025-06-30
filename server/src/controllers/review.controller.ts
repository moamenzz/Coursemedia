import AppErrorCode from "../constants/AppErrorCode";
import { FORBIDDEN, NOT_FOUND } from "../constants/HttpStatusCode";
import CourseModel from "../models/course.model";
import InstructorModel from "../models/instructor.model";
import ReviewModel from "../models/review.model";
import { answerReviewSchema, reviewSchema } from "../schemas/review.schema";
import {
  answerReview,
  deleteAnswer,
  didUserLeaveReview,
  featureReview,
  leaveReview,
} from "../services/review.service";
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

export const checkDidUserLeaveReview = catchErrors(async (req, res) => {
  const userId = req.userId;
  const courseId = req.params.courseId;

  const { reviewFound } = await didUserLeaveReview(courseId, userId);

  res.status(200).json(reviewFound);
});

export const handleLeaveReview = catchErrors(async (req, res) => {
  const userId = req.userId;
  const courseId = req.params.courseId;
  const data = reviewSchema.parse(req.body);

  await leaveReview(userId, courseId, data);

  res.status(200).json({ message: "Request Successful" });
});

export const handleFeatureReview = catchErrors(async (req, res) => {
  const instructorId = req.userId;
  const reviewId = req.params.reviewId;
  const courseId = req.params.courseId;

  const { message } = await featureReview(instructorId, reviewId, courseId);

  res.status(200).json(message);
});

export const handleAnswerReview = catchErrors(async (req, res) => {
  const instructorId = req.userId;
  const courseId = req.params.courseId;
  const reviewId = req.params.reviewId;

  const data = answerReviewSchema.parse(req.body);

  const { message } = await answerReview(
    instructorId,
    courseId,
    reviewId,
    data
  );

  res.status(200).json(message);
});

export const handleDeleteAnswer = catchErrors(async (req, res) => {
  const instructorId = req.userId;
  const courseId = req.params.courseId;
  const reviewId = req.params.reviewId;

  const { message } = await deleteAnswer(instructorId, courseId, reviewId);

  res.status(200).json(message);
});
