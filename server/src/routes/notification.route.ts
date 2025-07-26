import express from "express";
import { getUserNotification } from "../controllers/notification.controller";

const notificationRouter = express.Router();

notificationRouter.get("/:userId", getUserNotification);

export default notificationRouter;
