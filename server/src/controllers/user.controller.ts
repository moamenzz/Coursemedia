import { NOT_FOUND } from "../constants/HttpStatusCode";
import UserModel from "../models/user.model";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchError";

export const getUser = catchErrors(async (req, res) => {
  const userId = req.userId;
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  res.status(200).json(user.omitPassword());
});
