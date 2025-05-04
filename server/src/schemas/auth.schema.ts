import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Please enter a valid email address")
      .max(255, "Email is too long"),
    username: z
      .string({ required_error: "Username is required" })
      .min(6, "Username must be at least 6 characters")
      .max(30, "Username cannot exceed 30 characters"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password cannot exceed 100 characters"),
    confirmPassword: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password cannot exceed 100 characters"),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters"),
  userAgent: z.string().optional(),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password cannot exceed 100 characters"),
    confirmPassword: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password cannot exceed 100 characters"),
    code: z
      .string({ required_error: "Verification code is required" })
      .max(255, "Verification code is invalid"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const codeSchema = z.string().min(1).max(255);
export const emailSchema = z.string().email().min(1).max(255);
