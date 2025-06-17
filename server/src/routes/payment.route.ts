import express from "express";
import {
  handleCreateCheckoutSession,
  handleStripeWebhook,
  handleVerifyCheckoutSession,
} from "../controllers/payment.controller";
import authenticate from "../middleware/authenticate";

const paymentRouter = express.Router();

paymentRouter.post("/webhook", handleStripeWebhook);

paymentRouter.post(
  "/create-checkout-session",
  authenticate,
  handleCreateCheckoutSession
);

paymentRouter.get(
  "/verify-checkout-session",
  authenticate,
  handleVerifyCheckoutSession
);
export default paymentRouter;
