import express from "express";
import { handleCreateCheckoutSession } from "../controllers/payment.controller";

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", handleCreateCheckoutSession);

export default paymentRouter;
