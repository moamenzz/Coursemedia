export const cloudinaryCoverOptions = {
  folder: "coursemedia/coursesCover",
  allowed_formats: ["jpg", "png", "webp", "jpeg"],
  resource_type: "image" as "image",
  transformation: [
    { quality: "auto:best" },
    { fetch_format: "auto" },
    { format: "webp" },
    {
      width: 1400,
      height: 720,
      crop: "fill",
      gravity: "auto",
    },
  ],
};

export const cloudinaryVideoOptions = {
  folder: "coursemedia/lectures",
  resource_type: "video" as "video",
  chunk_size: 6000000, // 6MB chunks
  eager: [{ quality: "auto", format: "mp4" }],
  eager_async: true,
};
