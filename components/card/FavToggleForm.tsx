import { toggleFavorite } from "@/utils/actions";
import { usePathname } from "next/navigation";
import FormContainer from "../form/FormContainer";
import { CardSubmitButton } from "../form/Buttons";

type FavToggleFormProps = {
  propertyId: string;
  favoriteId: string | null;
  variant?: "favtogglebutton" | "ghost";
};

function FavToggleForm({
  favoriteId,
  propertyId,
  variant,
}: FavToggleFormProps) {
  const pathname = usePathname();
  const toggleAction = toggleFavorite.bind(null, {
    propertyId,
    favoriteId,
    pathname,
  });
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={!!favoriteId} variant={variant} />
    </FormContainer>
  );
}

export default FavToggleForm;
