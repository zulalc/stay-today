import { fetchProperties } from "@/utils/actions";
import { PropertyProps } from "@/utils/types";
import EmptyList from "./EmptyList";
import PropertyList from "./PropertyList";

async function PropertiesContainer({
  search,
  category,
}: {
  category?: string;
  search?: string;
}) {
  const properties: PropertyProps[] = await fetchProperties({
    category,
    search,
  });

  if (properties.length === 0) {
    return (
      <EmptyList
        heading="No properties found"
        message="Please try again later"
        btnText="Clear filters"
      />
    );
  }

  return <PropertyList properties={properties} />;
}

export default PropertiesContainer;
