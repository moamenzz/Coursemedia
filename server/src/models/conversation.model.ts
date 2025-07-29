import mongoose from "mongoose";

interface ConversationDocument extends mongoose.Document {
  participants: mongoose.Types.ObjectId[];
  latestMessage: mongoose.Types.ObjectId;
  unreadBy: mongoose.Types.ObjectId[];
  starredBy: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new mongoose.Schema<ConversationDocument>(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    unreadBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    starredBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const ConversationModel = mongoose.model<ConversationDocument>(
  "Conversation",
  ConversationSchema
);

export default ConversationModel;
