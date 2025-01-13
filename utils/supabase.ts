import { createClient } from "@supabase/supabase-js";

const bucket = "stay-today-bucket";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, {
      cacheControl: "3600",
    });

  if (error) {
    console.error("Supabase upload error:", error);
    throw error;
  }
  if (!data) throw new Error("No data returned from upload");
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
