import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
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
    <Card className="max-w-sm bg-white dark:bg-gray-800 shadow-md p-4">
      <div className="flex items-center space-x-5">
        <img
          src={reviewInfo.image}
          alt="profile"
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {reviewInfo.name}
          </h3>
          <Rating rating={reviewInfo.rating} />
          <p className="text-gray-700 dark:text-gray-400 mt-4 text-sm">
            {reviewInfo.comment}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default ReviewCard;
