import { getConversations } from "../services/conversation.service";
import catchErrors from "../utils/catchError";

export const getUserConversations = catchErrors(async (req, res) => {
  const userId = req.userId;

  const { conversations } = await getConversations(userId);

  res.status(200).json(conversations);
});
