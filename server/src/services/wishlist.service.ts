import mongoose from "mongoose";
import UserModel from "../models/user.model";
import CourseModel from "../models/course.model";
import appAssert from "../utils/AppAssert";
import { BAD_REQUEST, NOT_FOUND } from "../constants/HttpStatusCode";
import WishlistModel from "../models/wishlist.model";
import PurchaseModel from "../models/purchase.model";

export const wishlistCourse = async (
  userId: mongoose.Types.ObjectId,
  courseId: string
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const course = await CourseModel.findById(courseId);
  appAssert(course, NOT_FOUND, "Course not found");

  const isCoursePurchased = await PurchaseModel.findOne({
    user: userId,
    course: courseId,
  });
  appAssert(
    !isCoursePurchased,
    BAD_REQUEST,
    "Cannot wishlist a purchased course"
  );

  const isCourseWishlisted = await WishlistModel.findOne({
    user: userId,
    course: courseId,
  });

  if (isCourseWishlisted) {
    const unwishlistedCourse = await WishlistModel.findOneAndDelete({
      user: userId,
      course: courseId,
    });

    return { message: "Course removed from wishlist successfully" };
  } else {
    const wishlishedCourse = await WishlistModel.create({
      user: userId,
      course: courseId,
    });

    return { message: "Course added to wishlist successfully" };
  }
};
