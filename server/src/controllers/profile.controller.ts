import profileSchema from "../schemas/profile.schema";
import { getUserProfile, updateProfile } from "../services/profile.service";
import catchErrors from "../utils/catchError";

export const getProfile = catchErrors(async (req, res) => {
  const profileId = req.params.profileId;

  const { hasProfile, instructor, profileWishlist } =
    await getUserProfile(profileId);

  res.status(200).json({ hasProfile, instructor, profileWishlist });
});

export const handleUpdateProfile = catchErrors(async (req, res) => {
  const userId = req.userId;
  const data = profileSchema.parse(req.body);

  const { updatedProfile } = await updateProfile(userId, data);

  res.status(200).json(updatedProfile);
});
