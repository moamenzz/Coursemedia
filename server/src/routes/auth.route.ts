import express from "express";
import {
  handleForgotPassword,
  handleLogin,
  handleLogout,
  handleOAuthCallBack,
  handleOAuthFailure,
  handleRefresh,
  handleRegister,
  handleResetPassword,
  handleVerifyEmail,
} from "../controllers/auth.controller";
import passport from "../config/passport";

const authRouter = express.Router();

authRouter.post("/register", handleRegister);
authRouter.post("/login", handleLogin);
authRouter.get("/refresh", handleRefresh);
authRouter.get("/logout", handleLogout);
authRouter.get("/verify-email/:code", handleVerifyEmail);
authRouter.post("/forgot-password", handleForgotPassword);
authRouter.put("/reset-password", handleResetPassword);

// OAuth Routes
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  handleOAuthCallBack
);

authRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
authRouter.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/failure" }),
  handleOAuthCallBack
);

authRouter.get("/failure", handleOAuthFailure);

export default authRouter;
