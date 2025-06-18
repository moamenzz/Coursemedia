const enum AppErrorCode {
  InvalidAccessToken = "InvalidAccessToken",
  EmailNotFound = "EmailNotFound",
  OAuthAccount = "OAuthAccount",
  NOTADMIN = "User Is not an Admin",
  NOTINSTRUCTOR = "Not an instructor",
  COURSENOTPURCHASED = "User has not purchased this course",
}

export default AppErrorCode;
