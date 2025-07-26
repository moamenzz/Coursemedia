import mongoose from "mongoose";
import { NOT_FOUND } from "../constants/HttpStatusCode";
import UserModel from "../models/user.model";
import appAssert from "../utils/AppAssert";
import MessageModel from "../models/message.model";

export const getUserChatHeads = async (userId: mongoose.Types.ObjectId) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  // Now, let's find the chat heads by using our message model and creating a chat head for each user that has sent a message to our user.

  const userMessages = await MessageModel.find({
    receiver: userId,
  });

  if (userMessages.length > 0) {
    const chatHeads = userMessages.map((message) => message.sender);
    return { chatHeads };
  } else {
    return { chatHeads: [] };
  }
};

export const getMessages = async (
  userId: mongoose.Types.ObjectId,
  receiverId: string
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const receiver = await UserModel.findById(receiverId);
  appAssert(receiver, NOT_FOUND, "Receiver not found");

  const messages = await MessageModel.find({
    $or: [
      { sender: userId, receiver: receiverId },
      { sender: receiverId, receiver: userId },
    ],
  });

  //   We are trying to find messages between these two users. We'll display them in a chat interface.

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

  // We can optionally stop users from sending messages to themselves, although not necessary and could be handled in the front-end.

  // Now, we want to make a new message document. This means that we'll allow the sender to create a new message and show it to the receiver or recipient.

  const newMessage = await MessageModel.create({
    receiver: receiverId,
    sender: userId,
    message: data.message,
  });

  return { newMessage };
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
    return { message: "Message Deleted Successfully." };
  } else {
    return { message: "You are not authorized to delete this message" };
  }
};
