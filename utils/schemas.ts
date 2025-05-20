import * as z from "zod";
import { ZodSchema } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

export const imageSchema = z.object({
  image: validateFile(),
});

function validateFile() {
  const maxUploadSize = 1024 * 1024; // 1MB
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      //refine() for adding custom validation
      return !file || file.size <= maxUploadSize;
    }, "File size must be less than 1MB")
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "Invalid file type");
}

export const propertySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  tagline: z
    .string()
    .min(1, { message: "Tagline is required" })
    .max(100, { message: "Tagline must be less than 100 characters" }),
  price: z.coerce
    .number()
    .int()
    .min(0, { message: "Price is required and must be greater than 0" }),
  category: z.string(),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "Description must be between 10 and 1000 words.",
    }
  ),
  country: z.string(),
  guests: z.coerce
    .number()
    .int()
    .min(0, { message: "Guests amount must be a positive number" }),
  bedrooms: z.coerce
    .number()
    .int()
    .min(0, { message: "Bedrooms amount must be a positive number" }),
  beds: z.coerce
    .number()
    .int()
    .min(0, { message: "Beds amount must be a positive number" }),
  bathrooms: z.coerce
    .number()
    .int()
    .min(0, { message: "Bathrooms amount must be a positive number" }),
  amenities: z.string(),
});

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);

    throw new Error(errors.join(", "));
  }
  return result.data;
}
/** const validatedProfile = validateWithZodSchema(profileSchema, {
    firstName: "John",
    lastName: "Doe"
  });**/

export const createReviewSchema = z.object({
  propertyId: z.string().min(1, { message: "Property ID is required" }),
  rating: z.coerce.number().min(1).max(5, {
    message: "Rating must be between 1 and 5",
  }),
  comment: z.string().min(10).max(200, { message: "Comment is required" }),
});

export const updateReviewSchema = z.object({
  reviewId: z.string().min(1, { message: "Review ID is required" }),
  rating: z.coerce.number().min(1).max(5, {
    message: "Rating must be between 1 and 5",
  }),
  comment: z.string().min(10).max(200, { message: "Comment is required" }),
});
