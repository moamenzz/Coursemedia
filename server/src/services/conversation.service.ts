import mongoose from "mongoose";
import { NOT_FOUND } from "../constants/HttpStatusCode";
import ConversationModel from "../models/conversation.model";
import MessageModel from "../models/message.model";
import UserModel from "../models/user.model";
import appAssert from "../utils/AppAssert";

export const getConversations = async (userId: mongoose.Types.ObjectId) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const conversations = await ConversationModel.find({
    participants: userId,
  }).populate({
    path: "participants",
    select: "username avatar",
  });

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

      return conversation.populate({
        path: "latestMessage",
        select: "message sender receiver",
      });
    })
  );

  return { conversations: await conversationsWithLatest };
};

export const starConversation = async (
  userId: mongoose.Types.ObjectId,
  conversationId: string
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const conversation = await ConversationModel.findById(conversationId);
  appAssert(conversation, NOT_FOUND, "Conversation not found");

  const isStarred = conversation.starredBy.includes(userId);
  if (isStarred) {
    const unstarConversation = await ConversationModel.findOneAndUpdate(
      { _id: conversationId },
      { $pull: { starredBy: userId } },
      { new: true }
    );

    return { conversation: unstarConversation };
  } else {
    const updatedConversation = await ConversationModel.findOneAndUpdate(
      { _id: conversationId },
      { $addToSet: { starredBy: userId } },
      { new: true }
    );

    return { conversation: updatedConversation };
  }
};
