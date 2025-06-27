import mongoose from "mongoose";

export interface LectureDocument extends mongoose.Document {
  course: mongoose.Types.ObjectId;
  title: string;
  url: string;
  publicId: string;
  freePreview: boolean;
}

const LectureSchema = new mongoose.Schema<LectureDocument>(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    title: { type: String, required: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    freePreview: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const LectureModel = mongoose.model<LectureDocument>("Lecture", LectureSchema);

export default LectureModel;
