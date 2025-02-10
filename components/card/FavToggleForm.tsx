import { toggleFavorite } from "@/utils/actions";
import { usePathname } from "next/navigation";
import FormContainer from "../form/FormContainer";
import { CardSubmitButton } from "../form/Buttons";

type FavToggleFormProps = {
  propertyId: string;
  favoriteId: string | null;
};

function FavToggleForm({ favoriteId, propertyId }: FavToggleFormProps) {
  const pathname = usePathname();
  const toggleAction = toggleFavorite.bind(null, {
    propertyId,
    favoriteId,
    pathname,
  });
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={!!favoriteId} />
    </FormContainer>
  );
}

export default FavToggleForm;
