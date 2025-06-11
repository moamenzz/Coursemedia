import express from "express";
import { getInstructor } from "../controllers/instructor.controller";

const instructorRouter = express.Router();

instructorRouter.get("/", getInstructor);

export default instructorRouter;
