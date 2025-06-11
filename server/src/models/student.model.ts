import mongoose from "mongoose";

export interface StudentDocument extends mongoose.Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new mongoose.Schema<StudentDocument>(
  {
    student: {
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

const StudentModel = mongoose.model<StudentDocument>("Student", StudentSchema);

export default StudentModel;
