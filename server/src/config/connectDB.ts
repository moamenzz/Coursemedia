import mongoose from "mongoose";
import { MONGODB_URI } from "../constants/getENV";

const connectDB = () => {
  try {
    mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export default connectDB;
