import assert from "node:assert";
import AppErrorCode from "../constants/AppErrorCode";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import AppError from "./AppError";

type AppAssert = (
  condition: any,
  statusCode: HttpStatusCode,
  message: string,
  errorCode?: AppErrorCode
) => asserts condition;

const appAssert: AppAssert = (condition, statusCode, message, errorCode) =>
  assert(condition, new AppError(statusCode, message, errorCode));

export default appAssert;
