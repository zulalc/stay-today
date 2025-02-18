import { useState } from "react";
import Title from "./Title";
import { Button } from "../ui/button";

function Description({ description }: { description: string }) {
  const [isDescShown, setIsDescShown] = useState(false);
  const words = description.split(" ");
  const isLongDesc = words.length > 100;

  const toggleDesc = () => {
    setIsDescShown(!isDescShown);
  };

  const displayedDesc =
    isLongDesc && !isDescShown
      ? words.slice(0, 100).join(" ") + "..."
      : description;
  return (
    <article className="mt-4">
      <Title text="Description" />
      <p className="text-muted-foreground font-light leading-loose">
        {displayedDesc}
      </p>
      {isLongDesc && (
        <Button variant="link" className="pl-0" onClick={toggleDesc}>
          {isDescShown ? "Show less" : "Show more"}
        </Button>
      )}
    </article>
  );
}

export default Description;
