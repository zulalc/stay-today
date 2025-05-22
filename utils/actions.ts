"use server";

import db from "./db";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import {
  createReviewSchema,
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

export const fetchProperties = async ({
  search = "",
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const properties = await db.property.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { tagline: { contains: search, mode: "insensitive" } },
      ],
      category,
    },
    select: {
      id: true,
      name: true,
      country: true,
      tagline: true,
      price: true,
      image: true,
    },
  });

  return properties;
};

export const fetchPropertyDetails = async (id: string) => {
  return db.property.findUnique({
    where: { id },
    include: {
      profile: true,
    },
  });
};

export const fetchFavorite = async ({ propertyId }: { propertyId: string }) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: { profileId: user.id, propertyId },
    select: { id: true },
  });

  return favorite?.id || null;
};

export const toggleFavorite = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { propertyId, favoriteId, pathname } = prevState;
  try {
    if (favoriteId) {
      await db.favorite.delete({ where: { id: favoriteId } });
    } else {
      await db.favorite.create({
        data: {
          profileId: user.id,
          propertyId,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: favoriteId ? "Removed from Favorites" : "Added to Favorites",
    };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

export const fetchFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: { profileId: user.id },
    select: {
      property: {
        select: {
          id: true,
          name: true,
          country: true,
          tagline: true,
          price: true,
          image: true,
        },
      },
    },
  });

  return favorites.map((favorite) => favorite.property);
};

//REVIEWS ACTIONS
export const createReviewAction = async (
  prevState: { message?: string; error?: Record<string, string[]> },
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const values = Object.fromEntries(formData);
    const parsedValues = {
      ...values,
      rating: parseFloat(values.rating as string),
    };
    const validatedFields = validateWithZodSchema(
      createReviewSchema,
      parsedValues
    );

    await db.review.create({
      data: {
        ...validatedFields,
        profileId: user.id,
      },
    });
    revalidatePath("/properties/" + values.propertyId);
    return { message: "Review created successfully!" };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

/*export const updateReviewAction = async (
  prevState: { message?: string; error?: Record<string, string[]> },
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const values = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(createReviewSchema, values);

    await db.review.update({
      where: { profileId: user.id, propertyId: values.propertyId },
      data: validatedFields,
    });
    revalidatePath("/profile");
    return { message: "Profile updated successfully!" };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};*/

export const fetchPropertyReviews = async ({
  propertyId,
}: {
  propertyId: string;
}) => {
  const reviews = await db.review.findMany({
    where: { propertyId },
    select: {
      id: true,
      rating: true,
      comment: true,
      updatedAt: true,
      profile: {
        select: {
          firstName: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews.map((review) => ({
    ...review,
    updatedAt: review.updatedAt.toISOString(),
  }));
};

export const fetchReviewsByUser = async () => {
  return { message: "User reviews fetched successfully!" };
};
export const deleteReview = async () => {
  return { message: "Review deleted successfully!" };
};
