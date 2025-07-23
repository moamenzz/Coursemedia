import express from "express";
import {
  getProfile,
  handleUpdateProfile,
} from "../controllers/profile.controller";

const profileRouter = express.Router();

profileRouter.put("/update-profile", handleUpdateProfile);
profileRouter.get("/:profileId", getProfile);

export default profileRouter;
