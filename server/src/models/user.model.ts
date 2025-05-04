import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  username: string;
  password: string;
  verified: boolean; // Is Email Verified?
  googleId: string;
  githubId: string;
  facebookId: string;
  createdAt: Date;
  updatedAt: Date;
  omitPassword(): Pick<
    UserDocument,
    "_id" | "email" | "username" | "verified" | "createdAt" | "updatedAt"
  >;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: {
      type: String,
      required: function () {
        // Passwort ist nur erforderlich, wenn kein OAuth-Anbieter verwendet wird
        return !this.googleId && !this.facebookId && !this.githubId;
      },
    },
    verified: { type: Boolean, default: false },
    googleId: { type: String },
    facebookId: { type: String },
    githubId: { type: String },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user as Pick<
    UserDocument,
    "_id" | "email" | "username" | "verified" | "createdAt" | "updatedAt"
  >;
};

const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
