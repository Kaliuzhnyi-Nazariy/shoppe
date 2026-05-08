// import { z } from "zod";

// export const addressValidation = z.object({
//   firstName: z.string().min(3, "First name should be longer than 3 characters"),
//   lastName: z.string().min(3, "Last name should be longer than 3 characters"),
//   companyName: z.string(),
//   country: z.string().min(1, "That field cannot be empty"),
//   streetAddress: z.string().min(1, "That field cannot be empty"),
//   postcode: z
//     .string()
//     .regex(
//       /^(\d{5}(?:-\d{4})?|[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}|[A-Z]{2}[0-9]{5}|[0-9]{5}|[0-9]{4})$/,
//     ),
//   city: z.string().min(1, "That field cannot be empty"),
//   phone: z
//     .string()
//     .regex(
//       /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2}))$/,
//     ),
//   email: z.email(),
// });

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
