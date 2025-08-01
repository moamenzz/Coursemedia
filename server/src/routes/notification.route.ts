import express from "express";
import {
  getUserNotification,
  handleDeleteNotifiaction,
  handleMarkAllAsRead,
  handleMarkAsRead,
} from "../controllers/notification.controller";

const notificationRouter = express.Router();

notificationRouter.get("/", getUserNotification);
notificationRouter.put("/read-all", handleMarkAllAsRead);
notificationRouter.put("/:notificationId", handleMarkAsRead);
notificationRouter.delete("/:notificationId", handleDeleteNotifiaction);

export default notificationRouter;
