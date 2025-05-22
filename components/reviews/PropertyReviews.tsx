"use client";
import { fetchPropertyReviews } from "@/utils/actions";
import Title from "../properties/Title";
import ReviewCard from "./ReviewCard";
import { ReviewProps } from "@/utils/types";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function PropertyReviews({ propertyId }: { propertyId: string }) {
  const [reviews, setReviews] = useState<ReviewProps[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        const data = await fetchPropertyReviews({ propertyId });
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews(null);
      }
      setLoading(false);
    }

    fetchReviews();
  }, [propertyId]);

  if (loading) return <Loading />;

  if (!reviews || reviews.length === 0)
    return <p className="text-muted-foreground mt-4">No reviews yet.</p>;

  return (
    <div className="mt-8">
      <Title text="Reviews" />
      <div className="grid md:grid-cols-2 gap-8 mt-4 ">
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { firstName, profileImage } = review.profile;
          const reviewInfo = {
            comment,
            rating,
            name: firstName,
            image: profileImage,
          };
          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
        })}
      </div>
    </div>
  );
}

export default PropertyReviews;
