import { axiosPublic } from "../config/axiosClient";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  username: string;
  confirmPassword: string;
  instructor?: boolean;
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

export interface StudentResponse {
  _id: string;
  student: AuthResponse;
  instructor: string;
  course: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseResponse {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  cover: string;
  curriculum: LectureResponse[];
  instructor: InstructorResponse;
  enrollees?: string[];
  category: string;
  level: string;
  rating: number;
  courseLanguage: string;
  courseObjectives: string[];
  courseRequirements: string[];
  courseWelcomeMessage: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  price: number;
  previousPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LectureResponse {
  _id?: string;
  title: string;
  url: string;
  publicId?: string;
  freePreview: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InstructorResponse {
  _id: string;
  user: AuthResponse;
  role: string;
  courses: CourseResponse[];
  students: StudentResponse[];
  revenue: number;
  createdAt: Date;
}

export interface CartResponse {
  _id: string;
  user: AuthResponse;
  courses: CourseResponse[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WishlistOrPurchaseResponse {
  _id: string;
  user: AuthResponse;
  course: CourseResponse;
  createdAt: Date;
  updatedAt: Date;
}

export interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
}

interface CloudinarySignature {
  timestamp: number;
  signature: string;
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

export const getInstructor = async (): Promise<InstructorResponse> =>
  axiosPublic.get("/instructor");

export const getCourse = async (courseId: string): Promise<CourseResponse> =>
  axiosPublic.get(`/course/${courseId}`);

export const createCourse = async (
  data: CourseResponse
): Promise<CourseResponse> => axiosPublic.post("/create/create-course", data);

export const uploadToCloudinary = async (
  file: File,
  signature: CloudinarySignature
): Promise<CloudinaryResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", signature.signature);
  formData.append("timestamp", signature.timestamp.toString());
  formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY!);

  return axiosPublic.post("/lecture/upload-to-cloudinary", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const deleteFromCloudinary = async (publicId: string) =>
  axiosPublic.delete(`/lecture/delete/${publicId}`);

export const getSignature = async (): Promise<CloudinarySignature> =>
  axiosPublic.get("/lecture/signature");

export const getTopCourses = async (): Promise<CourseResponse[]> =>
  axiosPublic.get("/course");

export const getExplorePageCourses = async (): Promise<CourseResponse[]> =>
  axiosPublic.get(`/course/explore-page`);

export const getCourses = async (url: string): Promise<CourseResponse[]> => {
  try {
    const baseUrl = "/course";
    const queryString = url.includes("?") ? url.split("?")[1] : "";

    // Don't encode the entire queryString, encode individual parameters instead
    const params = new URLSearchParams(queryString);
    const finalUrl = queryString ? `${baseUrl}?${params.toString()}` : baseUrl;

    const response = await axiosPublic.get(finalUrl);
    return response || [];
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const getMyCourses = async (): Promise<WishlistOrPurchaseResponse[]> =>
  axiosPublic.get("/purchase");

export const getWishlist = async (): Promise<WishlistOrPurchaseResponse[]> =>
  axiosPublic.get("/wishlist");

export const wishlistCourse = async (
  courseId: string
): Promise<CourseResponse> =>
  axiosPublic.put(`/wishlist/wishlist-course/${courseId}`);

export const unwishlistCourse = async (
  courseId: string
): Promise<CourseResponse> =>
  axiosPublic.put(`/wishlist/unwishlist-course/${courseId}`);

export const addToCart = async (courseId: string): Promise<CourseResponse> =>
  axiosPublic.put(`/cart/add-to-cart/${courseId}`);

export const getCart = async (): Promise<CartResponse[]> =>
  axiosPublic.get("/cart");

export const removeFromCart = async (courseId: string) =>
  axiosPublic.put(`/cart/remove-from-cart/${courseId}`);

export const createCheckoutSession = async (coursesIds: string[]) =>
  axiosPublic.post<{ url: string }>("/payment/create-checkout-session", {
    coursesIds,
  });
