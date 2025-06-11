import mongoose from "mongoose";

interface CartDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  courses: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model<CartDocument>("Cart", CartSchema);

export default CartModel;
