import z from "zod";

const profileSchema = z.object({
  username: z.string().min(1).max(30),
  avatar: z.string(),
  headline: z.string().max(45),
  bio: z.string().max(2000),
  socialLinks: z.object({
    website: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    youtube: z.string().url().optional(),
  }),
});

export default profileSchema;
