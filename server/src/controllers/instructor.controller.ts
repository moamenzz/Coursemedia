import AppErrorCode from "../constants/AppErrorCode";
import { FORBIDDEN } from "../constants/HttpStatusCode";
import InstructorModel from "../models/instructor.model";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchError";

export const getInstructor = catchErrors(async (req, res) => {
  const instructorId = req.userId;

  const instructor = await InstructorModel.findOne({
    user: instructorId,
  })
    .populate("user")
    .populate("courses")
    .populate("students");
  appAssert(
    instructor,
    FORBIDDEN,
    "You are not signed up as an instructor. Please make a new account and register as an instructor to access your dashboard and upload courses :)",
    AppErrorCode.NOTINSTRUCTOR
  );

  res.status(200).json(instructor);
});
