import mongoose from "mongoose";
import UserModel from "../models/user.model";
import appAssert from "../utils/AppAssert";
import { NOT_FOUND } from "../constants/HttpStatusCode";
import NotificationModel from "../models/notification.model";

export const markAsRead = async (
  userId: mongoose.Types.ObjectId,
  notificationId: string
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const notification = await NotificationModel.findById(notificationId);
  appAssert(notification, NOT_FOUND, "Notification not found");

  if (notification.user.equals(userId)) {
    notification.isRead = true;
    await notification.save();
    return { message: "Notification marked as read successfully" };
  }
  return {
    message: "You are not authorized to mark this notification as read",
  };
};
