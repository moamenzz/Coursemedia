import mongoose from "mongoose";
import cloudinary from "../config/cloudinary";
import { NOT_FOUND } from "../constants/HttpStatusCode";
import LectureModel from "../models/lecture.model";
import UserModel from "../models/user.model";
import appAssert from "../utils/AppAssert";
import { cloudinaryVideoOptions } from "../utils/cloudinaryOptions";
