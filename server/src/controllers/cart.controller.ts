import { addToCart, cartItems, removeFromCart } from "../services/cart.service";
import catchErrors from "../utils/catchError";

export const getCartItems = catchErrors(async (req, res) => {
  const userId = req.userId;

  const { courses } = await cartItems(userId);

  res.status(200).json(courses);
});

export const handleAddToCart = catchErrors(async (req, res) => {
  const userId = req.userId;
  const courseId = req.params.courseId;

  const { addedItem } = await addToCart(userId, courseId);

  res.status(200).json(addedItem);
});

export const handleRemoveFromCart = catchErrors(async (req, res) => {
  const userId = req.userId;
  const courseId = req.params.courseId;

  const { message } = await removeFromCart(userId, courseId);

  res.status(200).json({ message });
});
