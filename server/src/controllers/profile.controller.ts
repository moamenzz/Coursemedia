import { NOT_FOUND } from "../constants/HttpStatusCode";
import InstructorModel from "../models/instructor.model";
import ProfileModel from "../models/profile.model";
import UserModel from "../models/user.model";
import WishlistModel from "../models/wishlist.model";
import profileSchema from "../schemas/profile.schema";
import { updateProfile } from "../services/profile.service";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchError";

export const getProfile = catchErrors(async (req, res) => {
  const profileId = req.params.profileId;

  const user = await UserModel.findById(profileId);
  appAssert(user, NOT_FOUND, "User not found");

  const instructor = await InstructorModel.findOne({ user: profileId })
    .select("courses students")
    .populate({
      path: "courses",
      select: "title cover reviews curriculum _id",
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

  const hasProfile = await ProfileModel.findOne({ user: user._id }).select(
    "user username bio headline socialLinks avatar"
  );
  if (!hasProfile) {
    const profile = await ProfileModel.create({
      user: user._id,
      username: user.username,
    });
    res.status(200).json({ profile, instructor, profileWishlist });
    return;
  }
  res.status(200).json({ hasProfile, instructor, profileWishlist });
});

export const handleUpdateProfile = catchErrors(async (req, res) => {
  const userId = req.userId;
  const data = profileSchema.parse(req.body);

  const { updatedProfile } = await updateProfile(userId, data);

  res.status(200).json(updatedProfile);
});
