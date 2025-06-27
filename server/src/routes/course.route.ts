import express from "express";
import {
  getCourse,
  getCourses,
  getExplorePageCourses,
  handleCreateCourse,
  handleDeleteCourse,
  handleEditCourse,
  handleEnrollUser,
} from "../controllers/course.controller";
import authenticate from "../middleware/authenticate";

const courseRouter = express.Router();

courseRouter.get("/", getCourses);
courseRouter.get("/explore-page", getExplorePageCourses);
courseRouter.put("/enroll/:courseId", authenticate, handleEnrollUser);
courseRouter.post("/create-course", authenticate, handleCreateCourse);

courseRouter.get("/:courseId", getCourse);
courseRouter.put("/:courseId", authenticate, handleEditCourse);
courseRouter.delete("/:courseId", authenticate, handleDeleteCourse);

export default courseRouter;
