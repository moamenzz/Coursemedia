import { NODE_ENV } from "../constants/getENV";
import {
  BAD_REQUEST,
  CONFLICT,
  FORBIDDEN,
  NOT_FOUND,
} from "../constants/HttpStatusCode";
import VerificationTypes from "../constants/verificationTypes";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import VerificationModel from "../models/verification.model";
import appAssert from "../utils/AppAssert";
import bcrypt from "bcryptjs";
import {
  accessTokenSignOptions,
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from "../utils/jwtTokens";
import sendEmail from "../utils/sendEmail";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "../utils/emailTemplates";
import AppErrorCode from "../constants/AppErrorCode";
import InstructorModel from "../models/instructor.model";

interface RegisterParams {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  instructor?: boolean;
  userAgent?: string;
}

interface LoginParams {
  email: string;
  password: string;
  userAgent?: string;
}

const CLIENT_API = "http://localhost:5173";

export const createAccount = async (data: RegisterParams) => {
  // Prüfe ob E-mail schon existiert
  const email = await UserModel.findOne({ email: data.email });
  appAssert(!email, CONFLICT, "User already exists.");
  // Hash password
  const user = await UserModel.create({
    email: data.email,
    username: data.username,
    password: await bcrypt.hash(data.password, 10),
  });
  // Erstelle Session
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });
  // Erstelle VerificationCode
  const verificationCode = await VerificationModel.create({
    userId: user._id,
    type: VerificationTypes.EmailVerification,
  });
  // Create URL und Schick Bestätigung-Email
  const URL =
    NODE_ENV === "development"
      ? `${CLIENT_API}/verify-email?code=${
          verificationCode._id
        }&exp=${verificationCode.expiresAt.getTime()}`
      : "example.com";

  sendEmail({
    to: user.email,
    ...VERIFICATION_EMAIL_TEMPLATE(URL),
  });

  const isInstructor = data.instructor;

  if (isInstructor) {
    const createdInstructor = await InstructorModel.create({
      user: user._id,
    });
  }

  // Erstelle AccessToken und RefreshToken
  const accessToken = signToken(
    {
      userId: user._id,
      sessionId: session._id,
    },
    accessTokenSignOptions
  );

  const refreshToken = signToken(
    {
      sessionId: session._id,
    },
    refreshTokenSignOptions
  );

  return { user: user.omitPassword(), accessToken, refreshToken };
};

export const login = async (data: LoginParams) => {
  // Prufe ob E-mail existiert
  const user = await UserModel.findOne({ email: data.email });
  appAssert(user, NOT_FOUND, "Invalid credentials", AppErrorCode.EmailNotFound);

  // Prüfe ob der Account ein OAuth Account ist
  appAssert(
    user.password,
    BAD_REQUEST,
    "This account was created with OAuth. Please sign in with the appropriate provider.",
    AppErrorCode.OAuthAccount
  );

  // Prüfe ob password überin stimmt.
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  appAssert(isPasswordValid, BAD_REQUEST, "Invalid credentials");
  // Erstelle Session
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });
  // Erstelle AccessToken und RefreshToken
  const accessToken = signToken(
    {
      sessionId: session._id,
      userId: user._id,
    },
    accessTokenSignOptions
  );

  const refreshToken = signToken(
    {
      sessionId: session._id,
    },
    refreshTokenSignOptions
  );

  return { user: user.omitPassword(), accessToken, refreshToken };
};

export const refresh = async (refreshToken: string) => {
  // Prüfe ob RefreshToken gültig ist.
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });
  appAssert(payload, FORBIDDEN, "Invalid refresh token");
  // Find session by id and update it.
  const session = await SessionModel.findById(payload.sessionId);
  appAssert(
    session && session.expiresAt.getTime() > Date.now(),
    FORBIDDEN,
    "Session expired"
  );
  // Refresh refreshToken if it expires in less than 24 hours
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const sessionNeedsRefresh =
    session.expiresAt.getTime() - Date.now() <= oneDayInMs;
  if (sessionNeedsRefresh) {
    session.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await session.save();
  }

  const newRefreshToken = sessionNeedsRefresh
    ? signToken(
        {
          sessionId: session._id,
        },
        refreshTokenSignOptions
      )
    : undefined;

  // Refresh accessToken
  const accessToken = signToken(
    {
      sessionId: session._id,
      userId: session.userId,
    },
    accessTokenSignOptions
  );

  return { accessToken, newRefreshToken };
};

export const verifyEmail = async (code: string) => {
  // Bestätigung-Code finden
  const verificationCode = await VerificationModel.findOne({
    _id: code,
    type: VerificationTypes.EmailVerification,
    expiresAt: { $gt: Date.now() },
  });
  appAssert(
    verificationCode,
    NOT_FOUND,
    "Invalid or Expired Verification code"
  );
  // Benutzer aktualisieren
  const user = await UserModel.findByIdAndUpdate(
    verificationCode.userId,
    { verified: true },
    { new: true }
  );
  appAssert(user, NOT_FOUND, "User not found");
  // Verification Code löschen oder entfernen
  await verificationCode.deleteOne();
  // Benutzer zurückgeben
  return { user: user.omitPassword() };
};

export const forgotPassword = async (email: string) => {
  try {
    // Check if Email exists
    const user = await UserModel.findOne({ email });
    appAssert(user, NOT_FOUND, "User not Found");
    // Create Verification Code
    const verificationCode = await VerificationModel.create({
      userId: user._id,
      type: VerificationTypes.ResetPassword,
    });
    // Create URL & Send reset password email
    const URL =
      NODE_ENV === "development"
        ? `${CLIENT_API}/reset-password?code=${
            verificationCode._id
          }&exp=${verificationCode.expiresAt.getTime()}`
        : "example.com";

    sendEmail({
      to: user.email,
      ...PASSWORD_RESET_REQUEST_TEMPLATE(URL),
    });
  } catch (e) {
    console.error(e);
  }
};

export const resetPassword = async (code: string, password: string) => {
  // Check for verification code
  const verificationCode = await VerificationModel.findOne({
    _id: code,
    type: VerificationTypes.ResetPassword,
    expiresAt: { $gt: new Date() },
  });
  appAssert(
    verificationCode,
    NOT_FOUND,
    "Invalid or Expired Verification code"
  );
  // Update Password
  const updatedUser = await UserModel.findByIdAndUpdate(
    verificationCode.userId,
    { password: await bcrypt.hash(password, 10) },
    { new: true }
  );
  // Delete All Sessions
  await SessionModel.deleteMany({ userId: updatedUser?._id });
  // Return new user
  return { user: updatedUser?.omitPassword() };
};
