import mongoose from "mongoose";

interface InstructorDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  courses: mongoose.Types.ObjectId[];
  students: mongoose.Types.ObjectId[];
  role: string;
  revenue: number;
  createdAt: Date;
  updatedAt: Date;
}

const InstructorSchema = new mongoose.Schema<InstructorDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    role: { type: String, required: true, default: "Instructor" },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    revenue: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const InstructorModel = mongoose.model<InstructorDocument>(
  "Instructor",
  InstructorSchema
);

export default InstructorModel;
