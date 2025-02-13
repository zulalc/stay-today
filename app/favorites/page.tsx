"use client";
import EmptyList from "@/components/home/EmptyList";
import PropertyList from "@/components/home/PropertyList";
import { fetchFavorites } from "@/utils/actions";
import { PropertyProps } from "@/utils/types";
import { useEffect, useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState<PropertyProps[]>([]);
  useEffect(() => {
    fetchFavorites()
      .then((data) => setFavorites(data))
      .catch((error) => console.error("Error fetching favorites:", error));
  }, []);

  if (!favorites.length) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <EmptyList
          heading="No Favorites"
          message="Start adding properties to your favorites"
          btnText="Browse Listings"
        />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-semibold mb-8 text-center">Favorites</h1>
      <PropertyList properties={favorites} />
    </>
  );
}

export default Favorites;
