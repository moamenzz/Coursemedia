import mongoose from "mongoose";

interface InstructorReplyDocument extends mongoose.Document {
  review: mongoose.Types.ObjectId;
  reply: string;
  hasReply: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const InstructorReplySchema = new mongoose.Schema<InstructorReplyDocument>(
  {
    review: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Review",
    },
    reply: { type: String },
    hasReply: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const InstructorReplyModel = mongoose.model<InstructorReplyDocument>(
  "InstructorReply",
  InstructorReplySchema
);

export default InstructorReplyModel;
