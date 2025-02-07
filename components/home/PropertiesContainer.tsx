import { fetchProperties } from "@/utils/actions";
import { PropertyProps } from "@/utils/types";
import EmptyList from "./EmptyList";
import PropertyList from "./PropertyList";
import { useEffect, useState } from "react";
import Loading from "../card/Loading";

function PropertiesContainer({
  search,
  category,
}: {
  category?: string;
  search?: string;
}) {
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Prevents state updates if unmounted
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchProperties({ category, search });
        if (isMounted) setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [category, search]);

  if (loading) return <Loading />;

  if (properties.length === 0) {
    return (
      <div className="flex items-center justify-center ">
        <EmptyList
          heading="No properties found"
          message="Please try again later"
          btnText="Clear filters"
        />
      </div>
    );
  }

  return <PropertyList properties={properties} />;
}

export default PropertiesContainer;
