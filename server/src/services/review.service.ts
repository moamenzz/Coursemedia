import mongoose from "mongoose";
import UserModel from "../models/user.model";
import appAssert from "../utils/AppAssert";
import { FORBIDDEN, NOT_FOUND } from "../constants/HttpStatusCode";
import CourseModel from "../models/course.model";
import InstructorModel from "../models/instructor.model";
import ReviewModel from "../models/review.model";
import AppErrorCode from "../constants/AppErrorCode";
import InstructorReplyModel from "../models/instructorReply.model";

interface ReviewDataProps {
  rating: number;
  comment?: string;
}

export const leaveReview = async (
  userId: mongoose.Types.ObjectId,
  courseId: string,
  data: ReviewDataProps
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const course = await CourseModel.findOne({
    _id: courseId,
    enrollees: { $elemMatch: { $eq: userId.toString() } },
  });
  appAssert(
    course,
    NOT_FOUND,
    "Course not found or user is not enrolled in the course"
  );

  const review = await ReviewModel.findOne({
    user: userId,
    course: courseId,
  });

  if (!review) {
    const newReview = await ReviewModel.create({
      ...data,
      user: userId,
      course: courseId,
    });

    const updatedCourse = await CourseModel.findOneAndUpdate(
      { _id: courseId },
      { $addToSet: { reviews: newReview._id } },
      { new: true }
    );
    return { newReview };
  }

  if (review) {
    const newReview = await ReviewModel.findOneAndUpdate(
      { _id: review._id },
      { ...data },
      { new: true }
    );
    return { newReview };
  }
};

export const didUserLeaveReview = async (
  courseId: string,
  userId: mongoose.Types.ObjectId
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const course = await CourseModel.findOne({
    _id: courseId,
    enrollees: { $elemMatch: { $eq: userId.toString() } },
  });
  appAssert(
    course,
    NOT_FOUND,
    "Course not found or user is not enrolled in the course"
  );

  const review = await ReviewModel.findOne({
    user: userId,
    course: courseId,
  });

  if (review) return { reviewFound: review };
  return { reviewFound: false };
};

export const featureReview = async (
  instructorId: mongoose.Types.ObjectId,
  reviewId: string,
  courseId: string
) => {
  const instructor = await InstructorModel.findOne({ user: instructorId });
  appAssert(instructor, NOT_FOUND, "Instructor not found");

  const review = await ReviewModel.findById(reviewId);
  appAssert(review, NOT_FOUND, "Review not found");

  const course = await CourseModel.findById(courseId);
  appAssert(course, NOT_FOUND, "Course not found");

  const isReviewForCourse = review.course.toString() === courseId;
  appAssert(
    isReviewForCourse,
    FORBIDDEN,
    "You are not authorized to perform this action",
    AppErrorCode.REVIEWNOTFORCOURSE
  );

  const isReviewForInstructor = review.instructor.equals(instructor._id as any);
  appAssert(
    isReviewForInstructor,
    FORBIDDEN,
    "You are not authorized to perform this action",
    AppErrorCode.REVIEWNOTFORINSTRUCTOR
  );

  if (isReviewForInstructor && isReviewForCourse) {
    if (review.featured) {
      await ReviewModel.updateOne(
        { _id: reviewId },
        { $set: { featured: false } }
      );
    } else {
      const areThereFeaturedReviews = await ReviewModel.findOne({
        course: courseId,
        featured: true,
      });
      appAssert(
        !areThereFeaturedReviews,
        FORBIDDEN,
        "Only one review of a course can be featured at a time"
      );

      await ReviewModel.updateOne(
        { _id: reviewId },
        { $set: { featured: true } }
      );
    }
  }

  return { message: "Request Successful" };
};

interface AnswerReviewProps {
  reply: string;
}

export const answerReview = async (
  instructorId: mongoose.Types.ObjectId,
  courseId: string,
  reviewId: string,
  data: AnswerReviewProps
) => {
  const instructor = await InstructorModel.findOne({ user: instructorId });
  appAssert(instructor, NOT_FOUND, "Instructor not found");

  const review = await ReviewModel.findById(reviewId);
  appAssert(review, NOT_FOUND, "Review not found");

  const course = await CourseModel.findById(courseId);
  appAssert(course, NOT_FOUND, "Course not found");

  const isReviewForCourse = review.course.toString() === courseId;
  appAssert(
    isReviewForCourse,
    FORBIDDEN,
    "You are not authorized to perform this action",
    AppErrorCode.REVIEWNOTFORCOURSE
  );

  const isReviewForInstructor = review.instructor.equals(instructor._id as any);
  appAssert(
    isReviewForInstructor,
    FORBIDDEN,
    "You are not authorized to perform this action",
    AppErrorCode.REVIEWNOTFORINSTRUCTOR
  );

  const instructorReply = await InstructorReplyModel.findOne({
    review: reviewId,
  });

  if (instructorReply?.hasReply) {
    await InstructorReplyModel.updateOne(
      { _id: instructorReply._id },
      { $set: { reply: data.reply, hasReply: true } }
    );
  } else if (instructorReply?.hasReply === false) {
    await InstructorReplyModel.updateOne(
      { _id: instructorReply._id },
      { $set: { reply: data.reply, hasReply: true } }
    );
  } else {
    const newInstructorReply = await InstructorReplyModel.create({
      review: reviewId,
      reply: data.reply,
      hasReply: true,
    });

    await ReviewModel.findOneAndUpdate(
      {
        _id: reviewId,
      },
      {
        $set: { instructorReply: newInstructorReply._id },
      }
    );
  }

  return { message: "Request Successful" };
};

export const deleteAnswer = async (
  instructorId: mongoose.Types.ObjectId,
  courseId: string,
  reviewId: string
) => {
  const instructor = await InstructorModel.findOne({ user: instructorId });
  appAssert(instructor, NOT_FOUND, "Instructor not found");

  const review = await ReviewModel.findById(reviewId);
  appAssert(review, NOT_FOUND, "Review not found");

  const course = await CourseModel.findById(courseId);
  appAssert(course, NOT_FOUND, "Course not found");

  const isReviewForCourse = review.course.toString() === courseId;
  appAssert(
    isReviewForCourse,
    FORBIDDEN,
    "You are not authorized to perform this action",
    AppErrorCode.REVIEWNOTFORCOURSE
  );

  const isReviewForInstructor = review.instructor.equals(instructor._id as any);
  appAssert(
    isReviewForInstructor,
    FORBIDDEN,
    "You are not authorized to perform this action",
    AppErrorCode.REVIEWNOTFORINSTRUCTOR
  );

  const instructorReply = await InstructorReplyModel.findOne({
    review: reviewId,
  });

  if (instructorReply?.hasReply) {
    await InstructorReplyModel.updateOne(
      { _id: instructorReply._id },
      { $set: { reply: null, hasReply: false } }
    );
  }

  return {
    message: "Request Successful",
  };
};
