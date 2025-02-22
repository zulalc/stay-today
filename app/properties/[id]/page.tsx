"use client";
import FavToggleButton from "@/components/card/FavToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import BookingCalendar from "@/components/properties/booking/BookingCalendar";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import ImageContainer from "@/components/properties/ImageContainer";
import ShareButton from "@/components/properties/ShareButton";
import { fetchPropertyDetails } from "@/utils/actions";
import { PropertyDetailsProps } from "@/utils/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PropertyDetails from "@/components/properties/PropertyDetails";
import UserInfo from "@/components/properties/UserInfo";
import { Separator } from "@/components/ui/separator";
import Description from "@/components/properties/Description";
import Amenities from "@/components/properties/Amenities";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

/*const DynamicMap = dynamic(() => import("@/components/properties/Map"), {
  ssr: false,
  loading: () => <Skeleton className="h-[400px] w-full" />,
});*/

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

  const firstName = propertyDetails.profile.firstName;
  const profileImage = propertyDetails.profile.profileImage;
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
          <FavToggleButton propertyId={id} variant="ghost" />
        </div>
      </header>
      <ImageContainer
        image={propertyDetails.image}
        name={propertyDetails.name}
      />
      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-4">
              <h1 className="text-xl font-bold">{propertyDetails.name}</h1>
              <PropertyRating inPage propertyId={propertyDetails.id} />
            </div>
            <UserInfo profile={{ firstName, profileImage }} />
          </div>
          <PropertyDetails propertyDetails={propertyDetails} />
          <Separator className="mt-4" />
          <Description description={propertyDetails.description} />
          <Amenities amenities={propertyDetails.amenities} />S
        </div>
        <div className="lg:col-span-4 flex flex-col items-center">
          <BookingCalendar />
        </div>
      </section>
    </section>
  );
}
export default PropertyDetailsPage;
