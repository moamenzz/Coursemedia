import mongoose from "mongoose";
import UserModel from "../models/user.model";
import { NOT_FOUND } from "../constants/HttpStatusCode";
import appAssert from "../utils/AppAssert";
import CourseModel from "../models/course.model";
import PurchaseModel from "../models/purchase.model";

export const purchaseCourse = async (
  userId: mongoose.Types.ObjectId,
  courseId: string
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const course = await CourseModel.findById(courseId);
  appAssert(course, NOT_FOUND, "Course not found");

  const purchase = await PurchaseModel.create({
    user: userId,
    course: courseId,
  });

  return { purchase };
};
