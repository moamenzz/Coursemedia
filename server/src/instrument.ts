import "dotenv/config";
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { NODE_ENV, SENTRY_DSN } from "./constants/getENV";

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: NODE_ENV === "production" ? 0.1 : 1.0,
  profilesSampleRate: NODE_ENV === "production" ? 0.1 : 1.0,
  environment: NODE_ENV,
  integrations: [
    // Performance Monitoring
    Sentry.httpIntegration(),
    Sentry.expressIntegration(),
    // Profiling (optional)
    nodeProfilingIntegration(),
  ],
  beforeSend(event, hint) {
    // JWT expiration errors ignorieren
    if (hint?.originalException) {
      const error = hint.originalException as Error;
      if (error.message?.includes("jwt expired")) {
        return null;
      }
      // Weitere häufige Fehler ignorieren, die nicht kritisch sind
      if (error.message?.includes("TokenExpiredError")) {
        return null;
      }
    }
    return event;
  },
});
