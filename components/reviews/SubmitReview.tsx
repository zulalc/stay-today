"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import FormContainer from "../form/FormContainer";
import { createReviewAction } from "@/utils/actions";
import RatingInput from "../form/RatingInput";
import TextAreaInput from "../form/TextAreaInput";
import { SubmitButton } from "../form/Buttons";

function SubmitReview({ propertyId }: { propertyId: string }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  return (
    <div className="flex flex-col gap-4 mt-4">
      <Button
        onClick={() => setIsFormVisible(!isFormVisible)}
        variant="outline"
        className="bg-gray-200 dark:bg-gray-600 w-full"
      >
        Submit a Review
      </Button>
      {isFormVisible && (
        <Card className="p-4 mt-4">
          <FormContainer
            action={createReviewAction}
            onSuccess={() => setIsFormVisible(false)}
          >
            <input type="hidden" name="propertyId" value={propertyId} />
            <RatingInput name="rating" />
            <TextAreaInput
              name="comment"
              label="Your Review on the Property"
              defaultValue="Write your review here..."
            />
            <SubmitButton
              className="w-full mt-4 bg-violet-500 text-white hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 font-semibold py-3 rounded-xl shadow-md transition duration-200"
              text="Submit Review"
            />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}

export default SubmitReview;
