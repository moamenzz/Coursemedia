import { ErrorRequestHandler, Response } from "express";
import { z, ZodError } from "zod";
import AppError from "../utils/AppError";
import { clearCookies } from "../utils/cookies";

const handleZodError = (res: Response, error: ZodError) => {
  const errors = error.issues[0];
  res
    .status(400)
    .json({
      type: "ValidationError",
      message: errors.message,
      field: errors.path[0],
    });
};

const handleAppError = (res: Response, error: AppError) => {
  res
    .status(error.statusCode)
    .json({ message: error.message, errorCode: error.errorCode });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`Error path: ${req.path}`, error);

  if (error instanceof z.ZodError) {
    handleZodError(res, error);
    return;
  }

  if (error instanceof AppError) {
    handleAppError(res, error);
    return;
  }

  if (req.path === "/auth/refresh") {
    clearCookies(res);
    return;
  }

  res
    .status(error.status || 500)
    .json({ message: error.message || "Internal Server Error" });
};

export default errorHandler;
