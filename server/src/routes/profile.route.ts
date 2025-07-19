import express from "express";
import {
  getProfile,
  handleUpdateProfile,
} from "../controllers/profile.controller";

const profileRouter = express.Router();

profileRouter.get("/", getProfile);
profileRouter.put("/update-profile", handleUpdateProfile);

export default profileRouter;
