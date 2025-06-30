import express from "express";
import {
  getInstructor,
  getInstructorReviews,
} from "../controllers/instructor.controller";

const instructorRouter = express.Router();

instructorRouter.get("/", getInstructor);
instructorRouter.get("/reviews", getInstructorReviews);

export default instructorRouter;
