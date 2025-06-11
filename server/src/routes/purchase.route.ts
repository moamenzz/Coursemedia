import express from "express";
import {
  getPurchasedCourses,
  handlePurchaseCourse,
} from "../controllers/purchase.controller";

const purchaseRouter = express.Router();

purchaseRouter.get("/", getPurchasedCourses);

purchaseRouter.post("/:courseId", handlePurchaseCourse);

export default purchaseRouter;
