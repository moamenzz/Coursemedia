import express from "express";
import {
  getWishlists,
  handleUnwishlistCourse,
  handleWishlistCourse,
} from "../controllers/wishlist.controller";

const wishlistRouter = express.Router();

wishlistRouter.get("/", getWishlists);
wishlistRouter.put("/wishlist-course/:courseId", handleWishlistCourse);
wishlistRouter.put("/unwishlist-course/:courseId", handleUnwishlistCourse);

export default wishlistRouter;
