"use client";

import { fetchReviewsByUser } from "@/utils/actions";
import { UserReviewProps } from "@/utils/types";
import Title from "@/components/properties/Title";
import { useEffect, useState } from "react";
import ReviewCard from "@/components/reviews/ReviewCard";
import Loading from "@/components/reviews/Loading";

function Reviews() {
  const [reviews, setReviews] = useState<UserReviewProps[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        const data = await fetchReviewsByUser();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews(null);
      }
      setLoading(false);
    }

    fetchReviews();
  }, []);

  if (loading) return <Loading />;

  if (!reviews || reviews.length === 0)
    return <p className="text-muted-foreground mt-4">No reviews yet.</p>;

  return (
    <>
      <Title text="My Reviews" />
      <div className="grid md:grid-cols-2 gap-8 mt-4 ">
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { name, image } = review.property;
          const reviewInfo = {
            comment,
            rating,
            name,
            image,
          };
          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
        })}
      </div>
    </>
  );
}

export default Reviews;
