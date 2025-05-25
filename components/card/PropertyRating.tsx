"use client";
import { fetchPropertyRating } from "@/utils/actions";
import { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";

function PropertyRating({
  propertyId,
  inPage,
}: {
  propertyId: string;
  inPage: boolean;
}) {
  const [rating, setRating] = useState<number | null>(null);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRating() {
      setLoading(true);
      try {
        const { averageRating, totalReviews } = await fetchPropertyRating(
          propertyId
        );
        setRating(Number(averageRating));
        setTotalReviews(totalReviews);
      } catch (error) {
        console.error("Error fetching rating:", error);
        setRating(null);
        setTotalReviews(0);
      }
      setLoading(false);
    }

    fetchRating();
  }, [propertyId]);

  if (loading || totalReviews === 0 || rating === null) return null;

  const className = `flex gap-1 items-center ${inPage ? "text-md" : "text-xs"}`;
  const reviewCount = totalReviews > 1 ? "reviews" : "review";
  const reviewValue = `(${totalReviews} ${inPage ? reviewCount : ""})`;
  return (
    <span className={className}>
      <BsStarFill className="w-3 h-3" />
      {rating} {reviewValue}
    </span>
  );
}

export default PropertyRating;
