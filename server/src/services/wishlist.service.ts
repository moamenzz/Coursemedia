import mongoose from "mongoose";
import UserModel from "../models/user.model";
import CourseModel from "../models/course.model";
import appAssert from "../utils/AppAssert";
import { NOT_FOUND } from "../constants/HttpStatusCode";
import WishlistModel from "../models/wishlist.model";

export const wishlistCourse = async (
  userId: mongoose.Types.ObjectId,
  courseId: string
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const course = await CourseModel.findById(courseId);
  appAssert(course, NOT_FOUND, "Course not found");

  const wishlishedCourse = await WishlistModel.create({
    user: userId,
    course: courseId,
  });

  return { wishlishedCourse };
};

export const unwishlistCourse = async (
  userId: mongoose.Types.ObjectId,
  courseId: string
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const course = await CourseModel.findById(courseId);
  appAssert(course, NOT_FOUND, "Course not found");

  const wishlishedCourse = await WishlistModel.findOneAndDelete({
    user: userId,
    course: courseId,
  });

  return { wishlishedCourse };
};
