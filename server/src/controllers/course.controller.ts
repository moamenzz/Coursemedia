import { courseCategories } from "../constants/courseCategoryTypes";
import { NOT_FOUND } from "../constants/HttpStatusCode";
import CourseModel from "../models/course.model";
import InstructorModel from "../models/instructor.model";
import courseSchema from "../schemas/course.schema";
import {
  createNewCourse,
  deleteCourse,
  editCourse,
} from "../services/course.service";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchError";

export const getCourse = catchErrors(async (req, res) => {
  const courseId = req.params.courseId;

  const course = await CourseModel.findById(courseId)
    .populate("curriculum")
    .populate({
      path: "instructor",
      populate: {
        path: "user",
        select: "username", // Exclude password field
      },
    });
  appAssert(course, NOT_FOUND, "Course not found");

  res.status(200).json(course);
});

export const getCourses = catchErrors(async (req, res) => {
  console.log("Request URL:", req.url);
  console.log("Query parameters:", req.query);

  const { search, category, language, level, minPrice, maxPrice } = req.query;

  const filters: any = {};

  // Handle multiple categories
  if (category) {
    const categories = (category as string).split(",");
    filters.category = { $in: categories };
  }

  // Handle multiple languages
  if (language) {
    const languages = (language as string).split(",");
    filters.courseLanguage = { $in: languages };
  }

  // Handle multiple levels
  if (level) {
    const levels = (level as string).split(",");
    filters.level = { $in: levels };
  }

  // Add price range filter if provided
  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) filters.price.$gte = Number(minPrice);
    if (maxPrice) filters.price.$lte = Number(maxPrice);
  }

  // Search in title and instructor name
  if (search) {
    const decodedSearch = decodeURIComponent(search as string).trim();

    // First, find instructors matching the search term
    const instructors = await InstructorModel.find().populate("user");
    const matchingInstructorIds = instructors
      .filter((instructor) =>
        (instructor.user as any).username
          .toLowerCase()
          .includes(decodedSearch.toLowerCase())
      )
      .map((instructor) => instructor._id);

    filters.$or = [
      {
        title: {
          $regex: decodedSearch,
          $options: "i",
        },
      },
      {
        description: {
          $regex: decodedSearch,
          $options: "i",
        },
      },
      {
        category: {
          $regex: decodedSearch,
          $options: "i",
        },
      },
      {
        instructor: {
          $in: matchingInstructorIds,
        },
      },
    ];
  }

  const courses = await CourseModel.find(filters)
    .populate({
      path: "instructor",
      populate: {
        path: "user",
        select: "username",
      },
    })
    .select("-curriculum") // Exclude curriculum to reduce response size
    .sort({ createdAt: -1 });

  res.status(200).json(courses);
});

export const getExplorePageCourses = catchErrors(async (req, res) => {
  const bestSellerCourses: Record<any, any> = {};

  const categoryPromises = Object.values(courseCategories).map(
    async (category) => {
      const courses = await CourseModel.find({
        category: category,
        isBestSeller: true,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "user",
            select: "-password", // Exclude password field
          },
        })
        .sort({ rating: -1 }) // Nach Rating absteigend sortieren
        .limit(5);

      bestSellerCourses[category] = courses;
    }
  );

  await Promise.all(categoryPromises);

  res.status(200).json([bestSellerCourses]);
});

export const handleCreateCourse = catchErrors(async (req, res) => {
  const instructorId = req.userId;
  const data = courseSchema.parse(req.body);

  const { newCourse } = await createNewCourse(instructorId, data);

  res.status(200).json(newCourse);
});

export const handleEditCourse = catchErrors(async (req, res) => {
  const instructorId = req.userId;
  const courseId = req.params.courseId;
  const data = courseSchema.parse(req.body);

  const { message } = await editCourse(instructorId, courseId, data);

  res.status(200).json({ message });
});

export const handleDeleteCourse = catchErrors(async (req, res) => {
  const instructorId = req.userId;
  const courseId = req.params.courseId;

  const { message } = await deleteCourse(instructorId, courseId);

  res.status(200).json({ message });
});
