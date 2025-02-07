import { PropertyProps } from "@/utils/types";
import PropertyCard from "../card/PropertyCard";

function PropertyList({ properties }: { properties: PropertyProps[] }) {
  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-8">
      {properties.map((property) => {
        return <PropertyCard key={property.id} property={property} />;
      })}
    </section>
  );
}

export default PropertyList;
