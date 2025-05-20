import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Label } from "@/components/ui/label";

const RatingInput = ({
  name,
  labelText,
  defaultValue = 0,
}: {
  name: string;
  labelText?: string;
  defaultValue?: number;
}) => {
  const stars = [1, 2, 3, 4, 5];
  const [hover, setHover] = useState<number | null>(null);
  const [selected, setSelected] = useState<number>(defaultValue);

  return (
    <div className="mb-2 max-w-xs">
      <Label htmlFor={name} className="capitalize">
        {labelText || name}
      </Label>
      <div id={name} className="flex space-x-1 mt-1">
        {stars.map((star) => {
          const isFilled = (hover ?? selected) >= star;
          return (
            <button
              key={star}
              type="button"
              onClick={() => setSelected(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
                isFilled ? "bg-yellow-500" : "bg-gray-300"
              }`}
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              {isFilled ? <FaStar /> : <FaRegStar />}
            </button>
          );
        })}
      </div>

      <input type="hidden" name={name} value={selected} required />
    </div>
  );
};

export default RatingInput;
