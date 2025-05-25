import { useState } from "react";
import { Button } from "../ui/button";

function Comment({ comment }: { comment: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleComment = () => {
    setIsOpen(!isOpen);
  };
  const longComment = comment.length > 100;
  const displayedComment = isOpen
    ? comment
    : comment.slice(0, 100) + (longComment ? "..." : "");
  return (
    <div>
      <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
        {displayedComment}
      </p>
      {longComment && (
        <Button
          variant="link"
          className="pl-0 text-gray-600 dark:text-gray-300"
          onClick={toggleComment}
        >
          {isOpen ? "Show Less" : "Show More"}
        </Button>
      )}
    </div>
  );
}

export default Comment;
