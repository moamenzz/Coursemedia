import express from "express";
import {
  getCartItems,
  handleAddToCart,
  handleEmptyCart,
  handleRemoveFromCart,
} from "../controllers/cart.controller";

const cartRouter = express.Router();

cartRouter.get("/", getCartItems);

cartRouter.put("/add-to-cart/:courseId", handleAddToCart);
cartRouter.put("/remove-from-cart/:courseId", handleRemoveFromCart);

cartRouter.delete("/empty-cart", handleEmptyCart);

export default cartRouter;
