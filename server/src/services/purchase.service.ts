import mongoose from "mongoose";
import UserModel from "../models/user.model";
import { BAD_REQUEST, NOT_FOUND } from "../constants/HttpStatusCode";
import appAssert from "../utils/AppAssert";
import CourseModel from "../models/course.model";
import PurchaseModel from "../models/purchase.model";
import InstructorModel from "../models/instructor.model";

export const purchaseCourse = async (
  userId: string | mongoose.Types.ObjectId,
  courseId: string
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const course = await CourseModel.findById(courseId);
  appAssert(course, NOT_FOUND, "Course not found");

  const isCourseAlreadyPurchased = await PurchaseModel.findOne({
    user: userId,
    course: courseId,
  });
  appAssert(!isCourseAlreadyPurchased, BAD_REQUEST, "Course already purchased");

  const purchase = await PurchaseModel.create({
    user: userId,
    course: courseId,
  });

  if (purchase) {
    const updatedInstructor = await InstructorModel.findByIdAndUpdate(
      course.instructor,
      { $inc: { revenue: course.price } }
    );
  }

  return { purchase };
};
