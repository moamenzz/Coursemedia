import mongoose from "mongoose";

interface WishlistDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId; // Wishlist belongs to user
  course: mongoose.Types.ObjectId; // Wishlisted Courses
  createdAt: Date;
  updatedAt: Date;
}

const WishlistSchema = new mongoose.Schema<WishlistDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  },
  {
    timestamps: true,
  }
);

const WishlistModel = mongoose.model<WishlistDocument>(
  "Wishlist",
  WishlistSchema
);

export default WishlistModel;
