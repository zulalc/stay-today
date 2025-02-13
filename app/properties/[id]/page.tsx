"use client";
import FavToggleButton from "@/components/card/FavToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import ImageContainer from "@/components/properties/ImageContainer";
import ShareButton from "@/components/properties/ShareButton";
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
          <ShareButton
            name={propertyDetails.name}
            propertyId={propertyDetails.id}
          />
          <FavToggleButton propertyId={id} />
        </div>
      </header>
      <ImageContainer
        image={propertyDetails.image}
        name={propertyDetails.name}
      />
      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
          <div className="flex gap-x-4 items-center">
            <h1 className="text-xl font-bold">{propertyDetails.name}</h1>
            <PropertyRating inPage propertyId={id} />
          </div>
        </div>
        <div className="lg:col-span-4 flex flex-col items-center">
          {/*calendar*/}
        </div>
      </section>
    </section>
  );
}
export default PropertyDetailsPage;
