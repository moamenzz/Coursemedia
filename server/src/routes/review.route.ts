import express from "express";
import {
  checkDidUserLeaveReview,
  getCourseReviews,
  handleAnswerReview,
  handleDeleteAnswer,
  handleFeatureReview,
  handleLeaveReview,
} from "../controllers/review.controller";

const reviewRouter = express.Router();

reviewRouter.get("/user/:courseId", checkDidUserLeaveReview);
reviewRouter.put("/feature-review/:courseId/:reviewId", handleFeatureReview);
reviewRouter.put("/answer-review/:courseId/:reviewId", handleAnswerReview);
reviewRouter.delete("/delete-answer/:courseId/:reviewId", handleDeleteAnswer);
reviewRouter.get("/:courseId", getCourseReviews);

reviewRouter.put("/:courseId", handleLeaveReview);

export default reviewRouter;
