import mongoose from "mongoose";
import UserModel from "../models/user.model";
import appAssert from "../utils/AppAssert";
import { NOT_FOUND } from "../constants/HttpStatusCode";
import cloudinary from "../config/cloudinary";
import { cloudinaryAvatarOptions } from "../utils/cloudinaryOptions";
import ProfileModel from "../models/profile.model";
import InstructorModel from "../models/instructor.model";
import WishlistModel from "../models/wishlist.model";

interface ProfileProps {
  username: string;
  avatar: string;
  headline: string;
  bio: string;
  socialLinks: {
    website?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
  };
}

export const getUserProfile = async (profileId: string) => {
  const user = await UserModel.findById(profileId);
  appAssert(user, NOT_FOUND, "User not found");

  const instructor = await InstructorModel.findOne({ user: profileId })
    .select("courses students")
    .populate({
      path: "courses",
      select:
        "title cover reviews price enrollees previousPrice curriculum _id",
      populate: {
        path: "reviews",
        select: "rating",
      },
    })
    .sort({ rating: -1 })
    .limit(6);

  const profileWishlist = await WishlistModel.find({
    user: profileId,
  }).populate({
    path: "course",
    select: "instructor title description reviews cover price previousPrice",
    populate: {
      path: "instructor",
      select: "user",
      populate: {
        path: "user",
        select: "username", // Exclude password field
      },
    },
  });

  const hasProfile = await ProfileModel.findOne({ user: user._id })
    .select("user username bio headline socialLinks avatar")
    .populate("user");
  if (!hasProfile) {
    const profile = await ProfileModel.create({
      user: user._id,
      username: user.username,
    });
    return { hasProfile: profile, instructor, profileWishlist };
  }

  return { hasProfile, instructor, profileWishlist };
};

export const updateProfile = async (
  userId: mongoose.Types.ObjectId,
  data: ProfileProps
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  let avatarURL = user.avatar;
  let oldAvatarPublicId: string | undefined;
  if (user.avatar) {
    const urlParts = user.avatar.split("/");
    // Find the index of the folder in the URL
    const folderIndex = urlParts.findIndex((part) => part === "coursemedia");
    if (folderIndex !== -1) {
      // Join folder and filename, remove extension
      const publicIdWithExt = urlParts.slice(folderIndex).join("/");
      oldAvatarPublicId = publicIdWithExt.replace(/\.[^/.]+$/, "");
    }
  }

  if (data.avatar) {
    // Delete old avatar first
    if (user.avatar) {
      await cloudinary.uploader.destroy(oldAvatarPublicId as string);
    }

    // Upload and use new avatar
    const result = await cloudinary.uploader.upload(
      data.avatar,
      cloudinaryAvatarOptions
    );
    avatarURL = result.secure_url;
  }

  user.avatar = avatarURL;
  await user.save();

  const updatedProfile = await ProfileModel.findOneAndUpdate(
    { user: userId },
    { $set: data },
    { new: true }
  );
  return { updatedProfile };
};
