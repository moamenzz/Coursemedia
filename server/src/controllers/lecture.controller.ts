import cloudinary from "../config/cloudinary";
import catchErrors from "../utils/catchError";
import { cloudinaryVideoOptions } from "../utils/cloudinaryOptions";

export const getSignature = catchErrors(async (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000).toString();
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: "coursemedia/lectures",
    },
    process.env.CLOUDINARY_API_SECRET!
  );

  res.json({ timestamp, signature });
});

export const handleUploadLectureToCloudinary = catchErrors(async (req, res) => {
  const file = req.files?.file;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const uploadFile = Array.isArray(file) ? file[0] : file;
  const result = await cloudinary.uploader.upload(uploadFile.tempFilePath, {
    ...cloudinaryVideoOptions,
    resource_type: "video",
  });

  res.json({
    public_id: result.public_id,
    secure_url: result.secure_url,
  });
});

export const handleDeleteFromCloudinary = catchErrors(async (req, res) => {
  const { publicId } = req.params;

  await cloudinary.uploader.destroy(publicId, { resource_type: "video" });

  res.json({ message: "Video deleted successfully" });
});
