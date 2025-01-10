"use server";

import db from "./db";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { profileSchema } from "./schemas";
import { redirect } from "next/navigation";

export const createProfileAction = async (
  prevState: { message?: string; error?: Record<string, string[]> },
  formData: FormData
) => {
  try {
    // Parse and validate the form data using the schema
    const user = await currentUser();
    if (!user) throw new Error("Please login to create a profile");

    const values = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(values);

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

export const fetchProfileImage = async () => {
  const user = await currentUser();
  if (!user) throw new Error("Please login to fetch profile image");

  const profile = await db.profile.findUnique({
    where: { clerkId: user.id },
    select: {
      profileImage: true,
    },
  });

  return profile?.profileImage;
};
