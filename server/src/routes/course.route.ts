import express from "express";
import {
  getCourse,
  getCourses,
  getExplorePageCourses,
  handleCreateCourse,
  handleDeleteCourse,
  handleEditCourse,
} from "../controllers/course.controller";
import authenticate from "../middleware/authenticate";

const courseRouter = express.Router();

courseRouter.get("/", getCourses);
courseRouter.get("/explore-page", getExplorePageCourses);
courseRouter.post("/create-course", authenticate, handleCreateCourse);

courseRouter.get("/:courseId", authenticate, getCourse);
courseRouter.put("/:courseId", authenticate, handleEditCourse);
courseRouter.delete("/:courseId", authenticate, handleDeleteCourse);

export default courseRouter;
