import mongoose, { Types } from "mongoose";
import VerificationTypes from "../constants/verificationTypes";

interface VerificationDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: VerificationTypes;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VerificationSchema = new mongoose.Schema<VerificationDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
    type: { type: String, required: true },
    expiresAt: {
      type: Date,
      required: true,
      default: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    },
  },
  {
    timestamps: true,
  }
);

const VerificationModel = mongoose.model<VerificationDocument>(
  "VerificationCode",
  VerificationSchema
);

export default VerificationModel;
