import { z } from "zod";

const fileSchema = z.instanceof(FileList);

const CATEGORY_OPTIONS = [
  "ELECTRONICS",
  "GAMING",
  "HOME",
  "OTHER",
  "JEWELRY",
  "BOOKS",
  "FOOD",
] as const;

export const productValidation = z.object({
  photos: fileSchema,
  title: z.string().min(2, "Title should be longer than 2 characters"),
  description: z
    .string()
    .min(20, "Descrption must be longer than 20 characters"),
  additionalInformation: z.string().optional(),
  price: z.number(),
  amount: z.number().optional(),
  categories: z.array(z.enum(CATEGORY_OPTIONS)).min(1),
});
