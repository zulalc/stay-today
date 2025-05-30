import React from "react";
import { Card } from "@/components/ui/card";
import Rating from "./Rating";
import Comment from "./Comment";
import { deleteReview } from "@/utils/actions";
import FormContainer from "../form/FormContainer";
import { ActionButton } from "../form/Buttons";

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
      <div className="flex items-center space-x-4">
        <img
          src={reviewInfo.image}
          alt="profile"
          className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-700"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {reviewInfo.name}
            </h3>
            <div>{children}</div>
          </div>
          <Rating rating={reviewInfo.rating} />
          <Comment comment={reviewInfo.comment} />
        </div>
      </div>
    </Card>
  );
}

export default ReviewCard;
