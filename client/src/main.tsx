import * as Sentry from "@sentry/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./config/queryClient.ts";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
    Sentry.feedbackIntegration({
      colorScheme: "system",
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: import.meta.env.MODE === "production" ? 0.1 : 1.0, // In Entwicklung auf 1.0 setzen", // In Produktion auf 0.1 oder niedriger setzen
  // Session Replay
  replaysSessionSampleRate: 0.1, // 10% der Sessions aufzeichnen
  replaysOnErrorSampleRate: 1.0, // 100% der Sessions mit Fehlern aufzeichnen
  environment: import.meta.env.MODE, // 'development' oder 'production'
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
