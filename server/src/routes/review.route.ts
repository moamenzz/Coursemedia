import express from "express";
import {
  getCourseReviews,
  handleLeaveReview,
} from "../controllers/review.controller";

const reviewRouter = express.Router();

reviewRouter.get("/:courseId", getCourseReviews);

reviewRouter.put("/:courseId", handleLeaveReview);

export default reviewRouter;
