import express from "express";
import { getUserConversations } from "../controllers/conversation.controller";

const conversationRouter = express.Router();

conversationRouter.get("/", getUserConversations);

export default conversationRouter;
