import mongoose from "mongoose";
import NotificationTypes from "../constants/notificationTypes";

interface NotificationDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  title: string;
  message: string;
  isRead: boolean;
  notificationType: NotificationTypes;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new mongoose.Schema<NotificationDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    notificationType: {
      type: String,
      enum: Object.values(NotificationTypes),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const NotificationModel = mongoose.model<NotificationDocument>(
  "Notification",
  NotificationSchema
);

export default NotificationModel;
