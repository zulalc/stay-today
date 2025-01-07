import { profileSchema } from "./schemas";

export const createProfileAction = async (
  prevState: { message?: string; error?: Record<string, string[]> },
  formData: FormData
) => {
  try {
    // Parse and validate the form data using the schema
    const values = Object.fromEntries(formData);
    const validatedFields = profileSchema.safeParse(values);
    console.log(validatedFields);
    return { message: "Profile created successfully" };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong" };
  }
};
