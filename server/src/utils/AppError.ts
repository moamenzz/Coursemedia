import AppErrorCode from "../constants/AppErrorCode";
import { HttpStatusCode } from "../constants/HttpStatusCode";

class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public message: string,
    public errorCode?: AppErrorCode
  ) {
    super(message);
  }
}

export default AppError;
