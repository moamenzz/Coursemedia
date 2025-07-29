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
  avatar?: string;
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

interface InstructorReply {
  reply: string;
  hasReply: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewResponse {
  _id: string;
  user: AuthResponse;
  course: CourseResponse;
  rating: number;
  comment: string;
  instructorReply: InstructorReply;
  featured?: boolean;
  helpful?: number;
  unhelpful?: number;
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
  instructor?: InstructorResponse;
  enrollees?: AuthResponse[];
  category: string;
  level: string;
  courseLanguage: string;
  courseWelcomeMessage: string;
  courseObjectives: string[];
  courseRequirements: string[];
  courseWhoIsThisFor: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  price: number;
  previousPrice?: number;
  reviews?: ReviewResponse[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LectureResponse {
  _id?: string;
  title: string;
  url: string;
  type?: "video" | "assignment" | "quiz";
  duration?: number;
  publicId?: string;
  freePreview: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InstructorResponse {
  _id: string;
  user: AuthResponse;
  role?: string;
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

export interface ProfileResponse {
  _id?: string;
  avatar: string; // to make my life in UpdateProfileModal.tsx easier
  user?: AuthResponse;
  username: string;
  headline: string;
  bio: string;
  socialLinks: {
    website?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NotificationResponse {
  _id: string;
  user: AuthResponse;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfilePageResponse {
  hasProfile: ProfileResponse;
  instructor: InstructorResponse;
  profileWishlist: WishlistOrPurchaseResponse[];
}

export interface ConversationResponse {
  _id: string;
  participants: AuthResponse[];
  latestMessage: MessageResponse;
  unreadBy: AuthResponse[];
  starredBy: AuthResponse[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageResponse {
  _id: string;
  conversation: ConversationResponse;
  sender: AuthResponse;
  receiver: AuthResponse;
  message: string;
  edited: boolean;
  unsent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SendMessage {
  message?: string;
  attachement?: string;
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
): Promise<CourseResponse> => axiosPublic.post("/course/create-course", data);

export const editCourse = async ({
  data,
  courseId,
}: {
  data: CourseResponse;
  courseId: string;
}): Promise<CourseResponse> => axiosPublic.put(`/course/${courseId}`, data);

export const deleteCourse = async (courseId: string) =>
  axiosPublic.delete(`/course/${courseId}`);

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
  axiosPublic.delete(`/lecture/delete`, { data: { publicId } });

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

    return await axiosPublic.get(finalUrl);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const getMyCourses = async (): Promise<WishlistOrPurchaseResponse[]> =>
  axiosPublic.get("/purchase");

export const getWishlists = async (): Promise<WishlistOrPurchaseResponse[]> =>
  axiosPublic.get("/wishlist");

export const wishlistCourse = async (
  courseId: string
): Promise<CourseResponse> => axiosPublic.put(`/wishlist/${courseId}`);

export const addToCart = async (courseId: string): Promise<CourseResponse> =>
  axiosPublic.put(`/cart/add-to-cart/${courseId}`);

export const getCart = async (): Promise<CartResponse[]> =>
  axiosPublic.get("/cart");

export const removeFromCart = async (courseId: string) =>
  axiosPublic.put(`/cart/remove-from-cart/${courseId}`);

export const createCheckoutSession = async (
  coursesIds: string[]
): Promise<{ url: string }> =>
  axiosPublic.post("/payment/create-checkout-session", { coursesIds });

export const verifyCheckoutSession = async (
  sessionId: string
): Promise<{ message: string; success: boolean }> =>
  axiosPublic.get(`/payment/verify-checkout-session?sessionId=${sessionId}`);

export const getPlayerCourse = async (
  courseId: string
): Promise<CourseResponse> => axiosPublic.get(`/player/${courseId}`);

export const enrollUser = async (courseId: string) =>
  axiosPublic.put(`/course/enroll/${courseId}`);

export const submitReview = async (
  courseId: string,
  rating: number,
  comment: string
) => axiosPublic.put(`/review/${courseId}`, { rating, comment });

export const getUserReview = async (
  courseId: string
): Promise<ReviewResponse> => axiosPublic.get(`/review/user/${courseId}`);

export const getInstructorReviews = async (): Promise<ReviewResponse[]> =>
  axiosPublic.get("/instructor/reviews");

export const featureReview = async ({
  reviewId,
  courseId,
}: {
  reviewId: string;
  courseId: string;
}) => axiosPublic.put(`/review/feature-review/${courseId}/${reviewId}`);

export const answerReview = async ({
  reviewId,
  courseId,
  reply,
}: {
  reviewId: string;
  courseId: string;
  reply: string;
}) =>
  axiosPublic.put(`/review/answer-review/${courseId}/${reviewId}`, { reply });

export const deleteReviewAnswer = async ({
  reviewId,
  courseId,
}: {
  reviewId: string;
  courseId: string;
}) => axiosPublic.delete(`/review/delete-answer/${courseId}/${reviewId}`);

export const getCourseReviews = async (
  courseId: string
): Promise<ReviewResponse[]> => axiosPublic.get(`/review/${courseId}`);

export const getProfile = async (user: string): Promise<ProfilePageResponse> =>
  axiosPublic.get(`/profile/${user}`);

// export const getUserProfile = async (): Promise<ProfileResponse> =>
//   axiosPublic.get("/profile");

export const updateProfile = async (data: ProfileResponse) =>
  axiosPublic.put("/profile/update-profile", data);

export const getConversations = async (): Promise<ConversationResponse[]> =>
  axiosPublic.get("/conversation");

export const starConversation = async (
  conversationId: string
): Promise<ConversationResponse> =>
  axiosPublic.put(`/conversation/${conversationId}`);

export const getMessages = async (
  conversationId: string
): Promise<MessageResponse[]> => axiosPublic.get(`/message/${conversationId}`);

export const sendMessage = async ({
  receiverId,
  data,
}: {
  receiverId: string;
  data: SendMessage;
}) => axiosPublic.post(`/message/${receiverId}`, data);

export const editMessage = async ({
  messageId,
  data,
}: {
  messageId: string;
  data: SendMessage;
}) => axiosPublic.put(`/message/${messageId}`, data);

export const deleteMessage = async (messageId: string) =>
  axiosPublic.delete(`/message/${messageId}`);
