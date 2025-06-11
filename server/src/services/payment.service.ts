import mongoose from "mongoose";
import UserModel from "../models/user.model";
import { NOT_FOUND } from "../constants/HttpStatusCode";
import appAssert from "../utils/AppAssert";
import CourseModel from "../models/course.model";
import stripe from "../config/stripe";
import { CLIENT_URL } from "../constants/getENV";

export const createCheckoutSession = async (
  userId: mongoose.Types.ObjectId,
  coursesIds: string[]
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const courses = await CourseModel.find({ _id: { $in: coursesIds } });
  appAssert(courses, NOT_FOUND, "Courses not found");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: courses.map((course) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: course.title,
          description: course.subtitle,
          images: [course.cover],
        },
        unit_amount: Math.round(course.price * 100),
      },
      quantity: 1,
    })),
    mode: "payment",
    success_url: `${CLIENT_URL}/successful-payment?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${CLIENT_URL}/cart`,
    metadata: {
      userId: userId.toString(),
      coursesIds: coursesIds.join(","),
    },
  });
  return { url: session.url };
};
