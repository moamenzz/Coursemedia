import mongoose from "mongoose";
import InstructorModel from "../models/instructor.model";
import appAssert from "../utils/AppAssert";
import { FORBIDDEN, NOT_FOUND } from "../constants/HttpStatusCode";
import CourseModel from "../models/course.model";
import cloudinary from "../config/cloudinary";
import LectureModel from "../models/lecture.model";
import {
  cloudinaryCoverOptions,
  cloudinaryVideoOptions,
} from "../utils/cloudinaryOptions";
import UserModel from "../models/user.model";

interface CourseProps {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  cover: string;
  curriculum: {
    title: string;
    url: string;
    publicId: string;
    freePreview: boolean;
  }[];
  category: string;
  level: string;
  language: string;
  objectives: string[];
  requirements: string[];
  whoIsThisFor: string[];
  welcomeMessage: string;
  price: number;
  previousPrice?: number;
}
export const createNewCourse = async (
  instructorId: mongoose.Types.ObjectId,
  data: CourseProps
) => {
  const instructor = await InstructorModel.findOne({ user: instructorId });
  appAssert(
    instructor,
    FORBIDDEN,
    "Instructor is either invalid or was not found"
  );

  let coverURL;
  if (data.cover) {
    const result = await cloudinary.uploader.upload(
      data.cover,
      cloudinaryCoverOptions
    );
    coverURL = result.secure_url;
  }

  const {
    curriculum: _,
    cover: __,
    welcomeMessage,
    requirements,
    objectives,
    language,
    whoIsThisFor,
    ...restData
  } = data;

  const newCourse = await CourseModel.create({
    instructor: instructorId,
    enrollees: [],
    curriculum: [],
    cover: coverURL,
    ...restData,
    courseRequirements: requirements,
    courseWelcomeMessage: welcomeMessage,
    courseObjectives: objectives,
    courseLanguage: language,
    courseWhoIsThisFor: whoIsThisFor,
    isFeatured: false,
  });

  const curriculumIDs = await Promise.all(
    data.curriculum.map(async (lecture) => {
      const createdLecture = await LectureModel.create({
        course: newCourse._id,
        title: lecture.title,
        url: lecture.url,
        publicId: lecture.publicId,
        freePreview: lecture.freePreview,
      });
      return createdLecture._id;
    })
  );

  if (newCourse) {
    newCourse.curriculum = curriculumIDs as any; // Cast if curriculum expects LectureDocument[], otherwise adjust schema
    await newCourse.save();
  }

  await InstructorModel.updateOne(
    {
      user: instructorId,
    },
    {
      $push: {
        courses: newCourse._id,
      },
    }
  );

  return { newCourse };
};

export const editCourse = async (
  instructorId: mongoose.Types.ObjectId,
  courseId: string,
  data: CourseProps
) => {
  const instructor = await InstructorModel.findOne({ user: instructorId });
  appAssert(
    instructor,
    FORBIDDEN,
    "Instructor is either invalid or was not found"
  );

  const course = await CourseModel.findById(courseId).populate("curriculum");
  appAssert(course, NOT_FOUND, "Course was not found");

  if (course.instructor.equals(instructorId as mongoose.Types.ObjectId)) {
    // Handle cover image update if provided
    let coverURL = course.cover;
    if (data.cover && data.cover !== course.cover) {
      const result = await cloudinary.uploader.upload(
        data.cover,
        cloudinaryCoverOptions
      );
      coverURL = result.secure_url;
    }

    // Update lectures (curriculum)
    if (Array.isArray(data.curriculum)) {
      // Remove old lectures
      await LectureModel.deleteMany({ course: courseId });
      // Create new lectures
      const curriculumIDs = await Promise.all(
        data.curriculum.map(async (lecture) => {
          const createdLecture = await LectureModel.create({
            course: courseId,
            title: lecture.title,
            url: lecture.url,
            publicId: lecture.publicId,
            freePreview: lecture.freePreview,
          });
          return createdLecture._id;
        })
      );
      course.curriculum = curriculumIDs as any;
    }

    // Update course fields
    course.title = data.title;
    course.subtitle = data.subtitle;
    course.description = data.description;
    course.cover = coverURL;
    course.category = data.category as unknown as typeof course.category;
    course.level = data.level as unknown as typeof course.level;
    course.price = data.price;
    course.previousPrice = data.previousPrice;
    course.courseRequirements = data.requirements;
    course.courseWelcomeMessage = data.welcomeMessage;
    course.courseObjectives = data.objectives;
    course.courseLanguage =
      data.language as unknown as typeof course.courseLanguage;
    course.courseWhoIsThisFor = data.whoIsThisFor;

    await course.save();
    return { message: "Course updated successfully" };
  } else {
    return { message: "You are not authorized to edit this course" };
  }
};

export const deleteCourse = async (
  instructorId: mongoose.Types.ObjectId,
  courseId: string
) => {
  const instructor = await InstructorModel.findById(instructorId);
  appAssert(
    instructor,
    FORBIDDEN,
    "Instructor is either invalid or was not found"
  );

  const course = await CourseModel.findById(courseId);
  appAssert(course, NOT_FOUND, "Course not found");

  if (course.instructor.equals(instructor._id as mongoose.Types.ObjectId)) {
    await CourseModel.findByIdAndDelete(courseId);
    return { message: "Course deleted successfully" };
  }
  {
    return { message: "You are not authorized to delete this course" };
  }
};

export const enrollUser = async (
  userId: mongoose.Types.ObjectId,
  courseId: string
) => {
  const course = await CourseModel.findById(courseId);
  appAssert(course, NOT_FOUND, "Course not found");

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const updatedCourse = await CourseModel.findOneAndUpdate(
    { _id: courseId },
    { $addToSet: { enrollees: userId } },
    { new: true }
  );

  return { message: "User Enrolled Successfully" };
};
