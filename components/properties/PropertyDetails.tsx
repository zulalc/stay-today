import { formatQuantity } from "@/utils/format";
import { PropertyDetailsProps } from "@/utils/types";

function PropertyDetails({
  propertyDetails,
}: {
  propertyDetails: PropertyDetailsProps;
}) {
  return (
    <p className="text-md font-normal ">
      <span>
        {formatQuantity(propertyDetails.bedrooms, "bedroom")} &middot;{" "}
      </span>
      <span>{formatQuantity(propertyDetails.bathrooms, "bath")} &middot; </span>
      <span>{formatQuantity(propertyDetails.guests, "guest")} &middot; </span>
      <span>{formatQuantity(propertyDetails.beds, "bed")}</span>
    </p>
  );
}

export default PropertyDetails;
