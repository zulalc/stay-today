"use client";
import FavToggleButton from "@/components/card/FavToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import BookingCalendar from "@/components/properties/booking/BookingCalendar";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import ImageContainer from "@/components/properties/ImageContainer";
import ShareButton from "@/components/properties/ShareButton";
import { fetchPropertyDetails, findExistingReview } from "@/utils/actions";
import { PropertyDetailsProps } from "@/utils/types";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import PropertyDetails from "@/components/properties/PropertyDetails";
import UserInfo from "@/components/properties/UserInfo";
import { Separator } from "@/components/ui/separator";
import Description from "@/components/properties/Description";
import Amenities from "@/components/properties/Amenities";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "./loading";
import SubmitReview from "@/components/reviews/SubmitReview";
import PropertyReviews from "@/components/reviews/PropertyReviews";
import { useUser } from "@clerk/nextjs";

const DynamicMap = dynamic(
  () => import("@/components/properties/PropertyMap"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />,
  }
);

function PropertyDetailsPage() {
  const { id } = useParams() as { id: string }; //property id
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;

  const [propertyDetails, setPropertyDetails] =
    useState<PropertyDetailsProps | null>(null);
  const [hasNotReviewed, setHasNotReviewed] = useState(false);
  const [notOwner, setNotOwner] = useState(false);

  //fetch property details
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

  // Check if the user can review the property
  useEffect(() => {
    if (!userId || !propertyDetails) return;
    const notOwner = userId !== propertyDetails.profile.id;
    setNotOwner(notOwner);

    if (notOwner) {
      findExistingReview(userId, propertyDetails.id).then((reviewExists) => {
        setHasNotReviewed(Boolean(reviewExists));
      });
    }
  }, [userId, propertyDetails]);

  if (!propertyDetails) return <Loading />;

  const { firstName, profileImage } = propertyDetails.profile;

  return (
    <section>
      <BreadCrumbs name={propertyDetails.name} />

      <header className="flex justify-between items-center mt-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{propertyDetails.tagline}</h1>
        </div>
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

      <section className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-6">
            <div className="flex items-center gap-x-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                {propertyDetails.name}
              </h2>
              <PropertyRating inPage propertyId={propertyDetails.id} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-6">
            <div className="text-gray-700 dark:text-gray-300">
              <PropertyDetails propertyDetails={propertyDetails} />
            </div>
            <UserInfo profile={{ firstName, profileImage }} />
          </div>

          <Separator />

          <div className="dark:text-gray-300">
            <Description description={propertyDetails.description} />
          </div>

          <Amenities amenities={propertyDetails.amenities} />
          <DynamicMap countryCode={propertyDetails.country} />

          {hasNotReviewed && <SubmitReview propertyId={propertyDetails.id} />}
          <PropertyReviews propertyId={propertyDetails.id} />
        </div>

        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="sticky top-20">
            <BookingCalendar />
          </div>
        </div>
      </section>
    </section>
  );
}
export default PropertyDetailsPage;
