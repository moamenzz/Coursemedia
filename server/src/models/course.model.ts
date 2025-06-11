import mongoose from "mongoose";
import {
  courseCategories,
  courseLanguage,
  courseLevel,
} from "../constants/courseCategoryTypes";
import { LectureDocument } from "./lecture.model";

interface CourseDocument extends mongoose.Document {
  instructor: mongoose.Types.ObjectId;
  enrollees: mongoose.Types.ObjectId[];
  title: string;
  subtitle: string;
  description: string;
  cover: string;
  curriculum: LectureDocument[];
  category: courseCategories;
  level: courseLevel;
  rating: number;
  courseLanguage: courseLanguage;
  courseObjectives: string[];
  courseRequirements: string[];
  courseWelcomeMessage: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  price: number;
  previousPrice?: number;
}

const CourseSchema = new mongoose.Schema<CourseDocument>(
  {
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Instructor",
    },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    cover: { type: String, required: true },
    curriculum: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
    enrollees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    category: { type: String, required: true },
    level: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    courseLanguage: { type: String, required: true },
    courseObjectives: [{ type: String, required: true }],
    courseRequirements: [{ type: String, required: true }],
    courseWelcomeMessage: { type: String, required: true },
    isFeatured: { type: Boolean, required: true, default: false },
    isBestSeller: { type: Boolean, required: true, default: false },
    price: { type: Number, required: true, default: 0 },
    previousPrice: { type: Number },
  },
  {
    timestamps: true,
  }
);

const CourseModel = mongoose.model<CourseDocument>("Course", CourseSchema);

export default CourseModel;
