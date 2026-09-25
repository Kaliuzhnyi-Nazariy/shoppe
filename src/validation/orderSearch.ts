import z from "zod";

export const orderSearchValidation = z.object({
  orderId: z.string().length(36, { message: "ID should be 36 characters" }),
});
