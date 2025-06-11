import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./config/queryClient.ts";
import { StripeProvider } from "./context/useStripe.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <StripeProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </StripeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
