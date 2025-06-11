import { NOT_FOUND } from "../constants/HttpStatusCode";
import UserModel from "../models/user.model";
import WishlistModel from "../models/wishlist.model";
import { unwishlistCourse, wishlistCourse } from "../services/wishlist.service";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchError";

export const getWishlists = catchErrors(async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const wishlists = await WishlistModel.find({
    user: userId,
  }).populate({
    path: "course",
    populate: {
      path: "instructor",
      populate: {
        path: "user",
        select: "username", // Exclude password field
      },
    },
  });

  res.status(200).json(wishlists);
});

export const handleWishlistCourse = catchErrors(async (req, res) => {
  const userId = req.userId;
  const courseId = req.params.courseId;

  const { wishlishedCourse } = await wishlistCourse(userId, courseId);

  res.status(200).json(wishlishedCourse);
});

export const handleUnwishlistCourse = catchErrors(async (req, res) => {
  const userId = req.userId;
  const courseId = req.params.courseId;

  const { wishlishedCourse } = await unwishlistCourse(userId, courseId);

  res.status(200).json(wishlishedCourse);
});
