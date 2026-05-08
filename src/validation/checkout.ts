import { z } from "zod";
import { addressValidation } from "./address";

export const checkoutSchema = z.object({
  billing: addressValidation,
  shipping: addressValidation.optional(),
});
