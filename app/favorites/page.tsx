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
    <div className="flex justify-center items-center h-[300px]">
      <EmptyList
        heading="No Favorites"
        message="Start adding properties to your favorites"
        btnText="Browse Listings"
      />
    </div>;
  }

  return <PropertyList properties={favorites} />;
}

export default Favorites;
