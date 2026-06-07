import z from "zod";

export const addReviewValidation = z.object({
  name: z.string().min(1, { message: "Cannot be empty!" }),
  email: z.email().min(1, { message: "Cannot be empty!" }),
  comment: z.string().max(256).optional(),
  rating: z.number().min(1).max(5),
});

export const addReviewLogged = z.object({
  comment: z.string().max(256).optional(),
  rating: z.number().min(1).max(5),
});
