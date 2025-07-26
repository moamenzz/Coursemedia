import express from "express";
import {
  getChatHeads,
  getChatMessages,
  handleDeleteMessage,
  handleEditMessage,
  handleSendMessage,
} from "../controllers/message.controller";

const messageRouter = express.Router();

messageRouter.get("/", getChatHeads);
messageRouter.get("/:receiverId", getChatMessages);
messageRouter.post("/:receiverId", handleSendMessage);
messageRouter.put("/:messageId", handleEditMessage);
messageRouter.delete("/:messageId", handleDeleteMessage);

export default messageRouter;
