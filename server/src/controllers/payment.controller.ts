import { createCheckoutSession } from "../services/payment.service";
import catchErrors from "../utils/catchError";

export const handleCreateCheckoutSession = catchErrors(async (req, res) => {
  const userId = req.userId;
  const { coursesIds } = req.body;

  if (!coursesIds || !Array.isArray(coursesIds) || coursesIds.length === 0) {
    return res.status(400).json({ message: "Invalid or missing coursesIds" });
  }

  const { url } = await createCheckoutSession(userId, coursesIds);

  res.status(200).json({ url });
});
