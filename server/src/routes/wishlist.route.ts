import express from "express";
import {
  getWishlists,
  handleWishlistCourse,
} from "../controllers/wishlist.controller";

const wishlistRouter = express.Router();

wishlistRouter.get("/", getWishlists);
wishlistRouter.put("/:courseId", handleWishlistCourse);

export default wishlistRouter;
