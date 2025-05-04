const getENV = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`ENV Value is undefined: ${key}`);
  }
  return value;
};

export const PORT = getENV("PORT", "3000");
export const MONGODB_URI = getENV("MONGODB_URI");
export const CLIENT_URL = getENV("CLIENT_URL", "http://localhost:5173");
export const SESSION_SECRET = getENV("SESSION_SECRET", "http://localhost:5173");
export const ACCESS_TOKEN_SECRET = getENV("ACCESS_TOKEN_SECRET");
export const REFRESH_TOKEN_SECRET = getENV("REFRESH_TOKEN_SECRET");
export const RESEND_SECRET = getENV("RESEND_SECRET");
export const NODE_ENV = getENV("NODE_ENV");
export const SENDER_DOMAIN = getENV("SENDER_DOMAIN");
export const GOOGLE_CLIENT_ID = getENV("GOOGLE_CLIENT_ID");
export const GOOGLE_CLIENT_SECRET = getENV("GOOGLE_CLIENT_SECRET");
export const GITHUB_CLIENT_ID = getENV("GITHUB_CLIENT_ID");
export const GITHUB_CLIENT_SECRET = getENV("GITHUB_CLIENT_SECRET");
export const CLOUDINARY_CLOUD_NAME = getENV("CLOUDINARY_CLOUD_NAME");
export const CLOUDINARY_API_KEY = getENV("CLOUDINARY_API_KEY");
export const CLOUDINARY_API_SECRET = getENV("CLOUDINARY_API_SECRET");
