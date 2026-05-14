import { z } from "zod";

export const contactValidation = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email(),
  subject: z.string().optional(),
  message: z.string(),
});
