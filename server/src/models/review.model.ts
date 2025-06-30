import mongoose from "mongoose";

export interface ReviewDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  instructor: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
  instructorReply: Object;
  featured?: boolean;
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
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Instructor",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    rating: { type: Number, required: true },
    comment: { type: String },
    instructorReply: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InstructorReply",
    },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const ReviewModel = mongoose.model<ReviewDocument>("Review", ReviewSchema);

export default ReviewModel;
