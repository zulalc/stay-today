"use client";
import { Star } from "lucide-react";

function PropertyRating({
  propertyId,
  inPage,
}: {
  propertyId: string;
  inPage: boolean;
}) {
  const rating = 3.5;
  const totalReviews = 100;
  const className = `flex gap-1 items-center ${inPage ? "text-md" : "text-xs"}`;
  const reviewCount = totalReviews > 1 ? "reviews" : "review";
  const reviewValue = `(${totalReviews} ${inPage ? reviewCount : ""})`;
  return (
    <span className={className}>
      <Star className="w-3 h-3" />
      {rating} {reviewValue}
    </span>
  );
}

export default PropertyRating;
