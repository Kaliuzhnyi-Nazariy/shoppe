import { z } from "zod";

export const trackOrderValidation = z.object({
  orderId: z.string(),
});
