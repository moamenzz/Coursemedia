import mongoose from "mongoose";

export interface PurchaseDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId; // The user that purchased the course
  course: mongoose.Types.ObjectId; // The course that was purchased
  createdAt: Date;
  updatedAt: Date;
}

const PurchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
  },
  {
    timestamps: true,
  }
);

const PurchaseModel = mongoose.model<PurchaseDocument>(
  "Purchase",
  PurchaseSchema
);

export default PurchaseModel;
