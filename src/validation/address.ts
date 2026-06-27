import { z } from "zod";

export const addressValidation = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),

  lastName: z.string().min(3, "Last name must be at least 3 characters"),

  companyName: z.string(),

  country: z.string().min(1, "Country cannot be empty"),

  streetAddress: z.string().min(1, "Street address cannot be empty"),

  postcode: z
    .string()
    .regex(
      /^(\d{5}(?:-\d{4})?|[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}|[A-Z]{2}[0-9]{5}|[0-9]{5}|[0-9]{4})$/,
      "Invalid postcode format",
    ),

  city: z.string().min(1, "City cannot be empty"),

  phone: z
    .string()
    .regex(
      /^\+[1-9]\d{7,14}$/,
      "Invalid phone number format (use international format, e.g. +123456789)",
    ),

  email: z.string().email("Invalid email address"),
});
