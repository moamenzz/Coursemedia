import z from "zod";

const messageSchema = z.object({
  message: z.string().min(1).max(1000),
});

export default messageSchema;
