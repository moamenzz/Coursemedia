import mongoose from "mongoose";
import UserModel from "../models/user.model";
import appAssert from "../utils/AppAssert";
import { NOT_FOUND } from "../constants/HttpStatusCode";
import cloudinary from "../config/cloudinary";
import { cloudinaryAvatarOptions } from "../utils/cloudinaryOptions";
import ProfileModel from "../models/profile.model";

interface ProfileProps {
  username: string;
  avatar: string;
  headline: string;
  bio: string;
}

export const updateProfile = async (
  userId: mongoose.Types.ObjectId,
  data: ProfileProps
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  let avatarURL;
  if (data.avatar) {
    const result = await cloudinary.uploader.upload(
      data.avatar,
      cloudinaryAvatarOptions
    );
    avatarURL = result.secure_url;
  }

  //   TODO: Make sure that cloudinary deletes the old user avatar

  const updatedProfile = await ProfileModel.findOneAndUpdate(
    { user: userId },
    { ...data, avatar: avatarURL },
    { new: true }
  );
  return { updatedProfile };
};
