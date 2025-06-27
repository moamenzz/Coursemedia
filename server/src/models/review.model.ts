import mongoose from "mongoose";

interface ReviewDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new mongoose.Schema<ReviewDocument>(
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
    rating: { type: Number, required: true },
    comment: { type: String },
  },
  {
    timestamps: true,
  }
);

const ReviewModel = mongoose.model<ReviewDocument>("Review", ReviewSchema);

export default ReviewModel;
