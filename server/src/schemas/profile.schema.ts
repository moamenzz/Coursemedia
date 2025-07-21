import z from "zod";

const profileSchema = z.object({
  username: z.string().min(1).max(30),
  avatar: z.string(),
  headline: z.string().max(45),
  bio: z.string().max(2000),
  socialLinks: z.object({
    website: z.string().url().or(z.literal("")).optional(),
    linkedin: z
      .string()
      .url()
      .regex(/^https:\/\/(www\.)?linkedin\.com\/.*$/, "Must be a LinkedIn URL")
      .or(z.literal(""))
      .optional(),
    github: z
      .string()
      .url()
      .regex(/^https:\/\/(www\.)?github\.com\/.*$/, "Must be a GitHub URL")
      .or(z.literal(""))
      .optional(),
    youtube: z
      .string()
      .url()
      .regex(/^https:\/\/(www\.)?youtube\.com\/.*$/, "Must be a YouTube URL")
      .or(z.literal(""))
      .optional(),
  }),
});

export default profileSchema;
