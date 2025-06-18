import express from "express";
import { getPlayerCourse } from "../controllers/player.controller";
import authenticateCourse from "../middleware/courseAuthenticate";
import { getCourse } from "../controllers/course.controller";

const playerRouter = express.Router();

playerRouter.get("/:courseId", authenticateCourse, getCourse);

export default playerRouter;
