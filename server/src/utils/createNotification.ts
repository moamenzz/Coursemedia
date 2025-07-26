// We want to create user notifications in different case scenarios and use this utility to make the process easier.

import mongoose from "mongoose";
import UserModel from "../models/user.model";
import appAssert from "./AppAssert";
import { NOT_FOUND } from "../constants/HttpStatusCode";
import NotificationModel from "../models/notification.model";

interface createNotificationProps {
  userId: mongoose.Types.ObjectId;
  message: string;
}

const createNotification = async ({
  userId,
  message,
}: createNotificationProps) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  // Create notification for the user

  const notification = await NotificationModel.create({
    user: userId,
    message,
  });

  return { notification };
};

export default createNotification;

// Now we need to figure out the scenarios in which we want to create notifications.
