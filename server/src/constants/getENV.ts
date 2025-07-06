const getENV = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`ENV Value is undefined: ${key}`);
  }
  return value;
};

export const NODE_ENV = getENV("NODE_ENV");
export const APPLICATION_NAME = getENV("APPLICATION_NAME");
export const CLIENT_URL = getENV("CLIENT_URL");
export const PORT = getENV("PORT", "3000");
export const MONGODB_URI = getENV("MONGODB_URI");
export const ACCESS_TOKEN_SECRET = getENV("ACCESS_TOKEN_SECRET");
export const REFRESH_TOKEN_SECRET = getENV("REFRESH_TOKEN_SECRET");
export const SESSION_SECRET = getENV("SESSION_SECRET");
export const RESEND_SECRET = getENV("RESEND_SECRET");
export const NODEMAILER_APP_PASSWORD = getENV("NODEMAILER_APP_PASSWORD");
export const SENTRY_DSN = getENV(
  "SENTRY_DSN",
  "https://1f3fc246ed872a255d840ba1d5fb33eb@o4508207841869824.ingest.de.sentry.io/4509617461461072"
);
export const SENTRY_AUTH_TOKEN = getENV("SENTRY_AUTH_TOKEN");
export const SENDER_DOMAIN = getENV("SENDER_DOMAIN");
export const GOOGLE_CLIENT_ID = getENV("GOOGLE_CLIENT_ID");
export const GOOGLE_CLIENT_SECRET = getENV("GOOGLE_CLIENT_SECRET");
export const GITHUB_CLIENT_ID = getENV("GITHUB_CLIENT_ID");
export const GITHUB_CLIENT_SECRET = getENV("GITHUB_CLIENT_SECRET");
export const CLOUDINARY_CLOUD_NAME = getENV("CLOUDINARY_CLOUD_NAME");
export const CLOUDINARY_API_KEY = getENV("CLOUDINARY_API_KEY");
export const CLOUDINARY_API_SECRET = getENV("CLOUDINARY_API_SECRET");
export const STRIPE_SECRET_KEY = getENV("STRIPE_SECRET_KEY");
export const STRIPE_WEBHOOK_SECRET = getENV("STRIPE_WEBHOOK_SECRET");
