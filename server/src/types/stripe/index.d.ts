import mongoose from "mongoose";
import Stripe from "stripe";

declare module "stripe" {
  namespace Stripe {
    namespace Checkout {
      interface Session {
        metadata?: {
          userId?: mongoose.Types.ObjectId;
          coursesIds?: string;
          [key: string]: string | undefined;
        } | null;
      }
    }
  }
}

export {};
