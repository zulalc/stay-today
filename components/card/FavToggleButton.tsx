"use client";
import { CardSignInButton } from "../form/Buttons";
import { useAuth } from "@clerk/nextjs";
import FavToggleForm from "./FavToggleForm";
import { fetchFavorite } from "@/utils/actions";
import { useEffect, useState } from "react";

function FavToggleButton({
  propertyId,
  variant = "favtogglebutton",
}: {
  propertyId: string;
  variant?: "favtogglebutton" | "ghost";
}) {
  const { userId } = useAuth();
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchFavorite({ propertyId }).then((id) => {
        setFavoriteId(id);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [propertyId, userId]);

  if (!userId) return <CardSignInButton />;

  return (
    <FavToggleForm
      favoriteId={favoriteId}
      propertyId={propertyId}
      variant={variant}
    />
  );
}

export default FavToggleButton;
