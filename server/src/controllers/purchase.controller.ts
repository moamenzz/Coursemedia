import { NOT_FOUND } from "../constants/HttpStatusCode";
import PurchaseModel from "../models/purchase.model";
import UserModel from "../models/user.model";
import { purchaseCourse } from "../services/purchase.service";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchError";

export const getPurchasedCourses = catchErrors(async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const courses = await PurchaseModel.find({ user: userId });

  res.status(200).json(courses);
});

export const handlePurchaseCourse = catchErrors(async (req, res) => {
  const userId = req.userId;
  const courseId = req.params.courseId;

  const { purchase } = await purchaseCourse(userId, courseId);

  res.status(200).json(purchase);
});
