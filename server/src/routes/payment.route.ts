import express from "express";
import {
  handleCreateCheckoutSession,
  handleStripeWebhook,
} from "../controllers/payment.controller";
import authenticate from "../middleware/authenticate";

const paymentRouter = express.Router();

paymentRouter.post("/webhook", handleStripeWebhook);

paymentRouter.post(
  "/create-checkout-session",
  authenticate,
  handleCreateCheckoutSession
);
export default paymentRouter;
