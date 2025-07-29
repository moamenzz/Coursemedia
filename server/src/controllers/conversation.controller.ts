import {
  getConversations,
  starConversation,
} from "../services/conversation.service";
import catchErrors from "../utils/catchError";

export const getUserConversations = catchErrors(async (req, res) => {
  const userId = req.userId;

  const { conversations } = await getConversations(userId);

  res.status(200).json(conversations);
});

export const handleStarConversation = catchErrors(async (req, res) => {
  const userId = req.userId;
  const conversationId = req.params.conversationId;

  const { conversation } = await starConversation(userId, conversationId);

  res.status(200).json(conversation);
});
