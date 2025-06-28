import mongoose from "mongoose";
import UserModel from "../models/user.model";
import appAssert from "../utils/AppAssert";
import CourseModel from "../models/course.model";
import { NOT_FOUND } from "../constants/HttpStatusCode";
import ReviewModel from "../models/review.model";

interface ReviewDataProps {
  rating: number;
  comment?: string;
}

export const leaveReview = async (
  userId: mongoose.Types.ObjectId,
  courseId: string,
  data: ReviewDataProps
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const course = await CourseModel.findOne({
    _id: courseId,
    enrollees: { $elemMatch: { $eq: userId.toString() } },
  });
  appAssert(
    course,
    NOT_FOUND,
    "Course not found or user is not enrolled in the course"
  );

  const review = await ReviewModel.create({
    ...data,
    user: userId,
    course: courseId,
  });

  const updatedCourse = await CourseModel.findOneAndUpdate(
    { _id: courseId },
    { $addToSet: { reviews: review._id } },
    { new: true }
  );

  return { review };
};
