import stripe from "../config/stripe";
import { STRIPE_WEBHOOK_SECRET } from "../constants/getENV";
import { BAD_REQUEST } from "../constants/HttpStatusCode";
import { createCheckoutSession } from "../services/payment.service";
import { purchaseCourse } from "../services/purchase.service";
import catchErrors from "../utils/catchError";
import appAssert from "../utils/AppAssert";
import { emptyCart } from "../services/cart.service";

export const handleCreateCheckoutSession = catchErrors(async (req, res) => {
  const userId = req.userId;
  const { coursesIds } = req.body;

  if (!coursesIds || !Array.isArray(coursesIds) || coursesIds.length === 0) {
    return res.status(400).json({ message: "Invalid or missing coursesIds" });
  }

  const { url } = await createCheckoutSession(userId, coursesIds);

  res.status(200).json({ url });
});

export const handleStripeWebhook = catchErrors(async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error(`Webhook Fehler: ${err.message}`);
    return res.status(BAD_REQUEST).send(`Webhook Fehler: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata?.userId;
    const coursesIds = session.metadata?.coursesIds;

    appAssert(userId, BAD_REQUEST, "userId fehlt");
    appAssert(coursesIds, BAD_REQUEST, "coursesIds fehlen");

    console.log("userId:", userId);
    console.log("coursesIds:", coursesIds);

    try {
      const coursesIdsArray = coursesIds.split(",");
      const purchaseArray: string[] = [];

      for (const courseId of coursesIdsArray) {
        const { purchase } = await purchaseCourse(userId, courseId.trim());
        purchaseArray.push(purchase?._id as string);
      }

      console.log("Kauf erfolgreich:", purchaseArray.join(", "));
    } catch (error: any) {
      console.error(`Fehler beim Erstellen des Kaufs: ${error.message}`);
    }
  }

  res.json({ received: true });
});
