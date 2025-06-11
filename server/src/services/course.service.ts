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

interface CourseProps {
  title: string;
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
  objectives: string;
  requirements: string;
  welcomeMessage: string;
  price: number;
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

  const curriculumIDs = await Promise.all(
    data.curriculum.map(async (lecture) => {
      const createdLecture = await LectureModel.create({
        title: lecture.title,
        url: lecture.url,
        publicId: lecture.publicId,
        preview: lecture.freePreview,
      });
      return createdLecture._id;
    })
  );

  const {
    curriculum: _,
    cover: __,
    welcomeMessage,
    requirements,
    objectives,
    language,
    ...restData
  } = data;
  const newCourse = await CourseModel.create({
    instructor: instructorId,
    enrollees: [],
    curriculum: curriculumIDs,
    cover: coverURL,
    ...restData,
    courseRequirements: requirements,
    courseWelcomeMessage: welcomeMessage,
    courseObjectives: objectives,
    courseLanguage: language,
    isFeatured: false,
  });

  const addToInstructorCourses = await InstructorModel.updateOne(
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
  const instructor = await InstructorModel.findById(instructorId);
  appAssert(
    instructor,
    FORBIDDEN,
    "Instructor is either invalid or was not found"
  );

  const course = await CourseModel.findById(courseId).populate("curriculum");
  appAssert(course, NOT_FOUND, "Course was not found");

  if (course.instructor === instructor._id) {
    await CourseModel.updateOne({ _id: courseId }, data);
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
