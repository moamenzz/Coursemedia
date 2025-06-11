import mongoose from "mongoose";

export interface LectureDocument extends mongoose.Document {
  title: string;
  url: string;
  publicId: string;
  freePreview: boolean;
}

const LectureSchema = new mongoose.Schema<LectureDocument>(
  {
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
