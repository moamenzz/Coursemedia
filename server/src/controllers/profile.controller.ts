import { NOT_FOUND } from "../constants/HttpStatusCode";
import ProfileModel from "../models/profile.model";
import UserModel from "../models/user.model";
import profileSchema from "../schemas/profile.schema";
import { updateProfile } from "../services/profile.service";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchError";

export const getProfile = catchErrors(async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const hasProfile = await ProfileModel.findOne({ user: user._id });
  if (!hasProfile) {
    const profile = await ProfileModel.create({
      user: user._id,
      username: user.username,
    });
    res.status(200).json(profile);
    return;
  }
  res.status(200).json(hasProfile);
});

export const handleUpdateProfile = catchErrors(async (req, res) => {
  const userId = req.userId;
  const data = profileSchema.parse(req.body);

  const { updatedProfile } = await updateProfile(userId, data);

  res.status(200).json(updatedProfile);
});
