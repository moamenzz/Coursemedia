import express from "express";
import {
  checkDidUserLeaveReview,
  getCourseReviews,
  handleAnswerReview,
  handleDeleteAnswer,
  handleFeatureReview,
  handleLeaveReview,
} from "../controllers/review.controller";
import authenticate from "../middleware/authenticate";

const reviewRouter = express.Router();

reviewRouter.get("/user/:courseId", authenticate, checkDidUserLeaveReview);
reviewRouter.put(
  "/feature-review/:courseId/:reviewId",
  authenticate,
  handleFeatureReview
);
reviewRouter.put(
  "/answer-review/:courseId/:reviewId",
  authenticate,
  handleAnswerReview
);
reviewRouter.delete(
  "/delete-answer/:courseId/:reviewId",
  authenticate,
  handleDeleteAnswer
);
reviewRouter.get("/:courseId", getCourseReviews);

reviewRouter.put("/:courseId", authenticate, handleLeaveReview);

export default reviewRouter;
