import mongoose from "mongoose";
import UserModel from "../models/user.model";
import appAssert from "../utils/AppAssert";
import { NOT_FOUND } from "../constants/HttpStatusCode";
import CartModel from "../models/cart.model";
import CourseModel from "../models/course.model";

export const cartItems = async (userId: mongoose.Types.ObjectId) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const courses = await CartModel.find({ user: userId })
    .populate({
      path: "courses",
      populate: {
        path: "instructor",
        populate: {
          path: "user",
          select: "username", // Exclude password field
        },
      },
    })
    .populate("user");

  return { courses };
};

export const addToCart = async (
  userId: mongoose.Types.ObjectId,
  courseId: string
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const course = await CourseModel.findById(courseId);
  appAssert(course, NOT_FOUND, "Course not found");

  const addedItem = await CartModel.findOneAndUpdate(
    { user: userId },
    { $addToSet: { courses: courseId } },
    { new: true }
  );

  if (!addedItem) {
    const newCart = await CartModel.create({
      user: userId,
      courses: [courseId],
    });
    return { addedItem: newCart };
  }

  return { addedItem };
};

export const removeFromCart = async (
  userId: mongoose.Types.ObjectId,
  courseId: string
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const course = await CourseModel.findById(courseId);
  appAssert(course, NOT_FOUND, "Course not found");

  const removedItem = await CartModel.findOneAndUpdate(
    { user: userId },
    { $pull: { courses: courseId } },
    { new: true }
  );

  return { message: "Course removed from cart successfully" };
};
