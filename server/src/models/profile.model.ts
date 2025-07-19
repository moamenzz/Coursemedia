import mongoose from "mongoose";

interface ProfileDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  username: string;
  avatar: string;
  headline: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new mongoose.Schema<ProfileDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    username: { type: String, required: true },
    avatar: { type: String },
    headline: { type: String },
    bio: { type: String },
  },
  { timestamps: true }
);

const ProfileModel = mongoose.model<ProfileDocument>("Profile", ProfileSchema);

export default ProfileModel;
