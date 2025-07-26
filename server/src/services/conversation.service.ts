import mongoose from "mongoose";
import { NOT_FOUND } from "../constants/HttpStatusCode";
import ConversationModel from "../models/conversation.model";
import MessageModel from "../models/message.model";
import UserModel from "../models/user.model";
import appAssert from "../utils/AppAssert";

export const getConversations = async (userId: mongoose.Types.ObjectId) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const conversations = await ConversationModel.find({ participants: userId });

  const conversationsWithLatest = Promise.all(
    conversations.map(async (conversation) => {
      const latestMessage = (await MessageModel.findOne({
        conversation: conversation._id,
      }).sort({
        createdAt: -1,
      })) as InstanceType<typeof MessageModel> | null;

      if (latestMessage) {
        conversation.latestMessage =
          latestMessage._id as typeof conversation.latestMessage;
      }

      return conversation;
    })
  );

  return { conversations: await conversationsWithLatest };
};
