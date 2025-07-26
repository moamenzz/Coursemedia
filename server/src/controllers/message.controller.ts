import messageSchema from "../schemas/message.schema";
import {
  deleteMessage,
  editMessage,
  getMessages,
  getUserChatHeads,
  sendMessage,
} from "../services/message.service";
import catchErrors from "../utils/catchError";

export const getChatHeads = catchErrors(async (req, res) => {
  const userId = req.userId;

  const { chatHeads } = await getUserChatHeads(userId);

  res.status(200).json(chatHeads);
});

export const getChatMessages = catchErrors(async (req, res) => {
  const userId = req.userId; // This is the one accessing the chat - we'll call him the sender.
  const receiverId = req.params.receiverId; // This is the one receiving the messages - we'll call him the receiver.

  const { messages } = await getMessages(userId, receiverId);

  res.status(200).json(messages);
});

export const handleSendMessage = catchErrors(async (req, res) => {
  const userId = req.userId; // This is the one accessing the chat - we'll call him the sender.
  const receiverId = req.params.receiverId; // This is the one receiving the messages - we'll call him the receiver.
  const data = messageSchema.parse(req.body); // Let's create a Zod schema for the data that will be sent. We'll later add images, attachements and video integration. But lets start simple.

  const { newMessage } = await sendMessage(receiverId, userId, data);

  res.status(200).json(newMessage);
});

export const handleEditMessage = catchErrors(async (req, res) => {
  const userId = req.userId;
  const messageId = req.params.messageId;
  const data = messageSchema.parse(req.body);

  const { editedMessage } = await editMessage(userId, messageId, data);

  res.status(200).json(editedMessage);
});

export const handleDeleteMessage = catchErrors(async (req, res) => {
  const userId = req.userId;
  const messageId = req.params.messageId;

  const { message } = await deleteMessage(userId, messageId);

  res.status(200).json(message);
});
