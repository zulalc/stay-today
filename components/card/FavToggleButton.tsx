import { BsHeart } from "react-icons/bs";
import { Button } from "../ui/button";

function FavToggleButton({ propertyId }: { propertyId: string }) {
  return (
    <Button size="icon" variant="outline" className="p-2 cursor pointer">
      <BsHeart />
    </Button>
  );
}

export default FavToggleButton;
