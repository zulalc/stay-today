import { FaRegStar, FaStar } from "react-icons/fa";

function Rating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= rating);

  return (
    <div className="flex space-x-1 mt-1">
      {stars.map((isFilled, i) => {
        return (
          <button
            key={i}
            type="button"
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
              isFilled ? "bg-yellow-500" : "bg-gray-300"
            }`}
            aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
          >
            {isFilled ? <FaStar /> : <FaRegStar />}
          </button>
        );
      })}
    </div>
  );
}

export default Rating;
