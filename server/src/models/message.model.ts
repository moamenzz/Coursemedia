import mongoose from "mongoose";

interface MessageDocument extends mongoose.Document {
  conversation: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  message: string;
  edited: boolean;
  unsent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new mongoose.Schema<MessageDocument>(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Conversation",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    message: { type: String, required: true },
    edited: { type: Boolean, default: false },
    unsent: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model<MessageDocument>("Message", MessageSchema);

export default MessageModel;
