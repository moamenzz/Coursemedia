import { NOT_FOUND } from "../constants/HttpStatusCode";
import NotificationModel from "../models/notification.model";
import UserModel from "../models/user.model";
import { markAsRead } from "../services/notification.service";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchError";

export const getUserNotification = catchErrors(async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const notifications = await NotificationModel.find({ user: userId }).sort({
    createdAt: -1,
  });

  res.status(200).json(notifications);
});

export const handleMarkAsRead = catchErrors(async (req, res) => {
  const userId = req.userId;
  const notificationId = req.params.notificationId;

  const { message } = await markAsRead(userId, notificationId);

  res.status(200).json(message);
});

export const handleMarkAllAsRead = catchErrors(async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const notificationsMarkedAsRead = await NotificationModel.find({
    user: userId,
  }).updateMany({ isRead: true });

  res.status(200).json(notificationsMarkedAsRead);
});

export const handleDeleteNotifiaction = catchErrors(async (req, res) => {
  const userId = req.userId;
  const notificationId = req.params.notificationId;

  const deletedNotification = await NotificationModel.findOneAndDelete({
    user: userId,
    _id: notificationId,
  });
  appAssert(deletedNotification, NOT_FOUND, "Notification not found");

  res.status(200).json(deletedNotification);
});
