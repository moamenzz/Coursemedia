import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../constants/getENV";

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-04-30.basil",
});

export default stripe;
