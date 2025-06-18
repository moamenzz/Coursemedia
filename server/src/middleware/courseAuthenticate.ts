import { RequestHandler } from "express";
import appAssert from "../utils/AppAssert";
import { FORBIDDEN, NOT_FOUND } from "../constants/HttpStatusCode";
import CourseModel from "../models/course.model";
import PurchaseModel from "../models/purchase.model";
import AppErrorCode from "../constants/AppErrorCode";

const authenticateCourse: RequestHandler = async (req, res, next) => {
  const userId = req.userId;
  appAssert(userId, NOT_FOUND, "User not authenticated/found");

  const courseId = req.params.courseId;
  appAssert(courseId, NOT_FOUND, "Course ID not provided");

  const course = await CourseModel.findById(courseId);
  appAssert(course, NOT_FOUND, "Course not found");

  const isCoursePurchased = await PurchaseModel.findOne({
    user: userId,
    course: courseId,
  });
  appAssert(
    isCoursePurchased,
    FORBIDDEN,
    "You've not purchased this course. If you think this is a mistake, please contact support.",
    AppErrorCode.COURSENOTPURCHASED
  );

  next();
};

export default authenticateCourse;
