import mongoose from "mongoose";
import UserModel from "../models/user.model";
import { BAD_REQUEST, NOT_FOUND } from "../constants/HttpStatusCode";
import appAssert from "../utils/AppAssert";
import CourseModel from "../models/course.model";
import stripe from "../config/stripe";
import { CLIENT_URL } from "../constants/getENV";
import PurchaseModel from "../models/purchase.model";
import { purchaseCourse } from "./purchase.service";

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

export const verfiyCheckoutSession = async (sessionId: string) => {
  appAssert(sessionId, BAD_REQUEST, "sessionId fehlt");

  try {
    const session = await stripe.checkout.sessions.retrieve(
      sessionId as string
    );

    if (session.payment_status === "paid") {
      const userId = session.metadata?.userId;
      const coursesIds = session.metadata?.coursesIds;

      appAssert(userId, BAD_REQUEST, "userId fehlt");
      appAssert(coursesIds, BAD_REQUEST, "coursesIds fehlen");

      for (const courseId of coursesIds.split(",")) {
        const isCoursePurchased = await PurchaseModel.findOne({
          user: userId,
          course: courseId,
        });

        if (isCoursePurchased) {
          return {
            message: "Course is already purchased successfully",
            success: true,
          };
        } else {
          const purchase = await purchaseCourse(userId, courseId);
          return {
            message:
              "Webhook failed, course was purchased succesfully on verification",
            purchase,
            success: true,
          };
        }
      }
    }

    return { message: "Payment unsuccessful or Webhook fail", success: false };
  } catch (error: any) {
    console.log(error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};
