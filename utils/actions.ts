"use server";

import db from "./db";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import {
  imageSchema,
  profileSchema,
  propertySchema,
  validateWithZodSchema,
} from "./schemas";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./supabase";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) throw new Error("Please login to access this page");
  if (!user.privateMetadata?.hasProfile) redirect("/profile/create");
  return user;
};

//PROFILE ACTIONS

export const fetchProfile = async () => {
  const user = await getAuthUser();
  const profile = await db.profile.findUnique({
    where: { clerkId: user.id },
  });
  if (!profile) redirect("/profile/create");
  return profile;
};

export const createProfileAction = async (
  prevState: { message?: string; error?: Record<string, string[]> },
  formData: FormData
) => {
  try {
    // Parse and validate the form data using the schema
    const user = await getAuthUser();

    const values = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, values);

    await db.profile.create({
      data: {
        clerkId: user.id,
        firstName: validatedFields.firstName,
        lastName: validatedFields.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
      },
    });

    const client = await clerkClient();

    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }

  redirect("/");
};

export const updateProfileAction = async (
  prevState: { message?: string; error?: Record<string, string[]> },
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const values = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, values);

    await db.profile.update({
      where: { clerkId: user.id },
      data: validatedFields,
    });
    revalidatePath("/profile");
    return { message: "Profile updated successfully!" };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

export const fetchProfileImage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: { clerkId: user.id },
    select: {
      profileImage: true,
    },
  });

  return profile?.profileImage;
};

export const updateProfileImageAction = async (
  prevState: { message?: string; error?: Record<string, string[]> },
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const image = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image });
    const path = await uploadImage(validatedFields.image);

    await db.profile.update({
      where: { clerkId: user.id },
      data: { profileImage: path },
    });
    revalidatePath("/profile");
    return { message: "Image updated succesfully" };
  } catch (error) {
    // Log the full error object for debugging
    console.error("Profile Image Update Error:", error);

    // If it's a Supabase error, it might have a message property
    if (error && typeof error === "object" && "message" in error) {
      return { message: error.message as string };
    }

    // If it's a standard Error object
    if (error instanceof Error) {
      return { message: error.message };
    }

    // If we can't determine the error type, stringify it
    return { message: JSON.stringify(error) };
  }
};

//PROPERTY ACTIONS

export const createPropertyAction = async (
  prevState: { message?: string; error?: Record<string, string[]> },
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const values = Object.fromEntries(formData);

    const image = formData.get("image") as File;

    const parsedValues = {
      ...values,
      price: parseFloat(values.price as string),
      guests: parseFloat(values.guests as string),
      bedrooms: parseFloat(values.bedrooms as string),
      beds: parseFloat(values.beds as string),
      bathrooms: parseFloat(values.bathrooms as string),
    };

    const validatedFields = validateWithZodSchema(propertySchema, parsedValues);
    const validatedImage = validateWithZodSchema(imageSchema, { image: image });
    const path = await uploadImage(validatedImage.image);

    await db.property.create({
      data: {
        ...validatedFields,
        image: path,
        profileId: user.id,
      },
    });
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }

  redirect("/");
};
