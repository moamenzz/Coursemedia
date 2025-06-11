import express from "express";
import {
  getSignature,
  handleDeleteFromCloudinary,
  handleUploadLectureToCloudinary,
} from "../controllers/lecture.controller";
import fileUpload from "express-fileupload";

const lectureRouter = express.Router();
lectureRouter.get("/signature", getSignature);
lectureRouter.post(
  "/upload-to-cloudinary",
  fileUpload({ useTempFiles: true }),
  handleUploadLectureToCloudinary
);
lectureRouter.delete("/delete/:publicId", handleDeleteFromCloudinary);

export default lectureRouter;
