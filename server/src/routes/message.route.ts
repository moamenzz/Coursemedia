import express from "express";
import {
  getChatMessages,
  handleDeleteMessage,
  handleEditMessage,
  handleSendMessage,
} from "../controllers/message.controller";

const messageRouter = express.Router();

messageRouter.get("/:conversationId", getChatMessages);
messageRouter.post("/:receiverId", handleSendMessage);
messageRouter.put("/:messageId", handleEditMessage);
messageRouter.delete("/:messageId", handleDeleteMessage);

export default messageRouter;
