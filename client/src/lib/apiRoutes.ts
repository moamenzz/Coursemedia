import { axiosPublic } from "../config/axiosClient";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  username: string;
  confirmPassword: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
  code: string;
}

export interface AuthResponse {
  _id: string;
  email: string;
  username: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  message?: string;
}

export const register = async (data: RegisterData) =>
  axiosPublic.post<AuthResponse>("/auth/register", data);

export const login = async (data: LoginData) =>
  axiosPublic.post<AuthResponse>("/auth/login", data);

export const logout = async () =>
  axiosPublic.get<{ message: string }>("/auth/logout");

export const verifyEmail = async (code: string) =>
  axiosPublic.get<AuthResponse>(`/auth/verify-email/${code}`);

export const forgotPassword = async (email: string) =>
  axiosPublic.post<{ message: string }>(`/auth/forgot-password`, { email });

export const resetPassword = async (data: ResetPasswordData) =>
  axiosPublic.put<AuthResponse>(`/auth/reset-password`, data);

export const getUser = async (): Promise<AuthResponse> =>
  axiosPublic.get("/user");
