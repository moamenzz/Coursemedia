import { CLIENT_URL } from "../constants/getENV";
import VerificationTypes from "../constants/verificationTypes";
import SessionModel from "../models/session.model";
import VerificationModel from "../models/verification.model";
import {
  codeSchema,
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../schemas/auth.schema";
import {
  createAccount,
  forgotPassword,
  login,
  refresh,
  resetPassword,
  verifyEmail,
} from "../services/auth.service";
import catchErrors from "../utils/catchError";
import {
  accessTokenCookieOptions,
  clearCookies,
  refreshTokenCookieOptions,
  setCookies,
} from "../utils/cookies";
import {
  AccessTokenPayload,
  accessTokenSignOptions,
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from "../utils/jwtTokens";

export const handleRegister = catchErrors(async (req, res) => {
  // Validate Request

  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // Call Service
  const { user, accessToken, refreshToken } = await createAccount(request);

  // Return Response
  return setCookies({ res, accessToken, refreshToken }).json(user);
});

export const handleLogin = catchErrors(async (req, res) => {
  // Validate Request
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  // Call service
  const { user, accessToken, refreshToken } = await login(request);

  // Return Response
  return setCookies({ res, accessToken, refreshToken }).json(user);
});

export const handleLogout = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const { payload } = verifyToken<AccessTokenPayload>(accessToken, {
    secret: accessTokenSignOptions.secret,
  });
  payload && (await SessionModel.findByIdAndDelete(payload.sessionId));

  return clearCookies(res).json({ message: "Logged out successfully" });
});

export const handleRefresh = catchErrors(async (req, res) => {
  // Validate Request
  const refreshToken = req.cookies.refreshToken;
  // Call Service
  const { accessToken, newRefreshToken } = await refresh(refreshToken);
  // Return Response
  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, refreshTokenCookieOptions());
  }
  return res
    .cookie("accessToken", accessToken, accessTokenCookieOptions())
    .json({ message: "Access token refreshed" });
});

export const handleVerifyEmail = catchErrors(async (req, res) => {
  // Validate Request
  const request = codeSchema.parse(req.params.code);

  // Call Service
  const { user } = await verifyEmail(request);
  // Return Response
  return res.json(user);
});

export const handleForgotPassword = catchErrors(async (req, res) => {
  // Validate Request
  const request = emailSchema.parse(req.body.email);
  // Call Service
  await forgotPassword(request);
  // Return Response
  return res.json({ message: "Password Reset Link Sent Successfully." });
});

export const handleResetPassword = catchErrors(async (req, res) => {
  // Validate Request
  const request = resetPasswordSchema.parse({
    ...req.body,
  });
  // Call Service
  const { user } = await resetPassword(request.code, request.password);
  // Return Response
  return res.json(user);
});

// OAuth handler

export const handleOAuthCallBack = catchErrors(async (req, res) => {
  if (!req.user) return res.redirect(`${CLIENT_URL}/login?error=oauth_failed`);

  const user = req.user;
  const userAgent = req.headers["user-agent"];

  const session = await SessionModel.create({
    userId: user._id,
    userAgent,
  });

  const verificationCode = await VerificationModel.create({
    userId: user._id,
    type: VerificationTypes.EmailVerification,
  });

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

  return setCookies({ res, accessToken, refreshToken }).redirect(CLIENT_URL);
});

export const handleOAuthFailure = catchErrors(async (req, res) => {
  return res.redirect("/login?error=oauth_failed");
});
