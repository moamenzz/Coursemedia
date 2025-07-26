import mongoose from "mongoose";
import { NOT_FOUND } from "../constants/HttpStatusCode";
import UserModel from "../models/user.model";
import appAssert from "../utils/AppAssert";
import MessageModel from "../models/message.model";
import ConversationModel from "../models/conversation.model";

export const getMessages = async (
  userId: mongoose.Types.ObjectId,
  conversationId: string
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  await ConversationModel.findOneAndUpdate(
    { _id: conversationId },
    { $pull: { unreadBy: userId } }
  );

  const messages = await MessageModel.find({
    conversation: conversationId,
  })
    .sort({ createdAt: -1 })
    .populate({
      path: "sender",
      select: "username avatar",
    });

  return { messages };
};

interface SendMessageProps {
  message: string;
}

export const sendMessage = async (
  receiverId: string,
  userId: mongoose.Types.ObjectId,
  data: SendMessageProps
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const receiver = await UserModel.findById(receiverId);
  appAssert(receiver, NOT_FOUND, "Receiver not found");

  const conversation = await ConversationModel.findOne({
    participants: { $all: [userId, receiverId] },
  });

  if (conversation) {
    const newMessage = await MessageModel.create({
      receiver: receiverId,
      sender: userId,
      message: data.message,
      conversation: conversation._id,
    });

    if (newMessage) {
      await ConversationModel.findOneAndUpdate({ _id: conversation._id });
    }

    return { newMessage };
  } else {
    const newConversation = await ConversationModel.create({
      participants: [userId, receiverId],
      unreadBy: [receiverId],
    });
    const newMessage = await MessageModel.create({
      receiver: receiverId,
      sender: userId,
      message: data.message,
      conversation: newConversation._id,
    });

    if (newMessage) {
      await ConversationModel.findOneAndUpdate(
        { _id: newConversation._id },
        { latestMessage: newMessage._id }
      );
    }

    return { newMessage };
  }
};

export const editMessage = async (
  userId: mongoose.Types.ObjectId,
  messageId: string,
  data: SendMessageProps
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const editedMessage = await MessageModel.findOneAndUpdate(
    { _id: messageId, sender: userId },
    { message: data.message }
  );

  // Null means that the message was not found. This is because the sender in the message id that we used, does not match the actual user that I'm logged in with.

  return { editedMessage };
};

export const deleteMessage = async (
  userId: mongoose.Types.ObjectId,
  messageId: string
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const message = await MessageModel.findOneAndDelete({
    _id: messageId,
    sender: userId,
  });

  if (message) {
    if (message) {
      // Check if deleted message was the latest
      const conversation = await ConversationModel.findById(
        message.conversation
      );
      if (
        conversation &&
        conversation.latestMessage &&
        conversation.latestMessage.toString() === messageId
      ) {
        // Find the new latest message
        const newLatest = await MessageModel.findOne({
          conversation: conversation._id,
        }).sort({ createdAt: -1 });
        await ConversationModel.findByIdAndUpdate(conversation._id, {
          latestMessage: newLatest ? newLatest._id : null,
        });
      }
    }
    return { message: "Message Deleted Successfully." };
  } else {
    return { message: "You are not authorized to delete this message" };
  }
};
