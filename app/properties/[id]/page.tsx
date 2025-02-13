"use client";
import FavToggleButton from "@/components/card/FavToggleButton";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import { fetchPropertyDetails } from "@/utils/actions";
import { PropertyDetailsProps } from "@/utils/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function PropertyDetailsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [propertyDetails, setPropertyDetails] =
    useState<PropertyDetailsProps | null>(null);

  useEffect(() => {
    if (!id) return;

    fetchPropertyDetails(id).then((data) => {
      if (!data) {
        router.push("/");
      } else {
        setPropertyDetails(data);
      }
    });
  }, [id, router]);

  if (!propertyDetails) return <div>Loading...</div>;

  const { bathrooms, bedrooms, beds, guests } = propertyDetails;
  const details = { bathrooms, bedrooms, beds, guests };
  return (
    <section>
      <BreadCrumbs name={propertyDetails.name} />
      <header className="flex justify-between items-center mt-4">
        <h1 className="text-4xl font-bold">{propertyDetails.tagline}</h1>
        <div className="flex items-center gap-x-4">
          <FavToggleButton propertyId={id} />
        </div>
      </header>
    </section>
  );
}
export default PropertyDetailsPage;
