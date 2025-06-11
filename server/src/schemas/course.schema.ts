import { z } from "zod";
import {
  courseCategories,
  courseLanguage,
  courseLevel,
} from "../constants/courseCategoryTypes";

const courseSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(1).max(45),
  description: z
    .string({ required_error: "Description is required" })
    .min(1)
    .max(500),
  cover: z.string({ required_error: "Cover is required" }).min(1).max(255),
  curriculum: z.array(
    z.object({
      title: z.string({ required_error: "Title is required" }).min(1).max(45),
      url: z.string({ required_error: "Url is required" }).min(1).max(255),
      publicId: z.string({ required_error: "Public id is required" }).min(1),
      freePreview: z.boolean(),
    })
  ),
  category: z.enum([
    courseCategories.cybersecurity,
    courseCategories.dataScience,
    courseCategories.machineLearning,
    courseCategories.other,
    courseCategories.programmingLanguages,
    courseCategories.webDevelopment,
  ]),
  level: z.enum([
    courseLevel.beginner,
    courseLevel.intermediate,
    courseLevel.advanced,
  ]),
  language: z.enum([
    courseLanguage.chinese,
    courseLanguage.english,
    courseLanguage.french,
    courseLanguage.german,
    courseLanguage.other,
    courseLanguage.russian,
    courseLanguage.spanish,
  ]),
  objectives: z
    .string({ required_error: "Objectives are required" })
    .min(1)
    .max(500),
  requirements: z
    .string({ required_error: "Requirements are required" })
    .min(1)
    .max(255),
  welcomeMessage: z
    .string({ required_error: "Welcome message is required" })
    .min(1)
    .max(500),
  price: z.number().min(0),
});

export default courseSchema;
