import React from "react";
import { Card } from "@/components/ui/card";
import RatingInput from "../form/RatingInput";
import Rating from "./Rating";

interface ReviewCardProps {
  reviewInfo: {
    image: string;
    name: string;
    rating: number;
    comment: string;
  };
  children?: React.ReactNode;
}

function ReviewCard({ reviewInfo, children }: ReviewCardProps) {
  return (
    <Card className="max-w-sm bg-white dark:bg-gray-900 shadow-lg p-4">
      <div className="flex items-center space-x-5">
        <img
          src={reviewInfo.image}
          alt="profile"
          className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-700"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {reviewInfo.name}
          </h3>
          <Rating rating={reviewInfo.rating} />
          <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
            {reviewInfo.comment}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default ReviewCard;
