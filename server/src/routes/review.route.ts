import express from "express";
import {
  checkDidUserLeaveReview,
  getCourseReviews,
  handleLeaveReview,
} from "../controllers/review.controller";

const reviewRouter = express.Router();

reviewRouter.get("/user/:courseId", checkDidUserLeaveReview);
reviewRouter.get("/:courseId", getCourseReviews);

reviewRouter.put("/:courseId", handleLeaveReview);

export default reviewRouter;
