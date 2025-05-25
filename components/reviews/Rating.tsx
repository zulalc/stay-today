import { FaRegStar, FaStar } from "react-icons/fa";
import { Button } from "../ui/button";

function Rating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= rating);

  return (
    <div className="flex space-x-1 mt-1">
      {stars.map((isFilled, i) => {
        return (
          <Button
            variant="rating"
            size="icon"
            aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
          >
            {isFilled ? <FaStar /> : <FaRegStar />}
          </Button>
        );
      })}
    </div>
  );
}

export default Rating;
