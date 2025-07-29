import express from "express";
import {
  getUserConversations,
  handleStarConversation,
} from "../controllers/conversation.controller";

const conversationRouter = express.Router();

conversationRouter.get("/", getUserConversations);
conversationRouter.put("/:conversationId", handleStarConversation);

export default conversationRouter;
