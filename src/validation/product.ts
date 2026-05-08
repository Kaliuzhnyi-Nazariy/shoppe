import { z } from "zod";

const fileSchema = z.instanceof(FileList);
// const fileSchema = z.instanceof(File);

export const productValidation = z.object({
  photos: fileSchema,
  // photos: z.array(fileSchema).max(10),
  title: z.string().min(2, "Title should be longer than 2 characters"),
  description: z
    .string()
    .min(20, "Descrption must be longer than 20 characters"),
  additionalInformation: z.string().optional(),
  price: z.number(),
  amount: z.number().optional(),
});
