import { formatCurrency } from "@/utils/format";
import { PropertyProps } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import PropertyRating from "./PropertyRating";
import FavToggleButton from "./FavToggleButton";
import CountryDetails from "./CountryDetails";

import { FaMapMarkerAlt } from "react-icons/fa";

function PropertyCard({ property }: { property: PropertyProps }) {
  const { name, image, price, country, id: propertyId, tagline } = property;

  const truncateText = (text: string, length: number) =>
    text.length > length ? text.substring(0, length) + "..." : text;

  return (
    <article className="group relative rounded-2xl overflow-hidden shadow-md transition hover:shadow-xl bg-white border border-gray-200">
      <Link href={`/properties/${propertyId}`}>
        <div className="relative h-[280px]">
          <Image
            src={image}
            fill
            alt={name}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 z-10">
            <FavToggleButton
              propertyId={propertyId}
              variant="favtogglebutton"
            />
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-gray-400" />
              <CountryDetails countryCode={country} />
            </div>
            <PropertyRating inPage={false} propertyId={propertyId} />
          </div>

          <h3 className="text-base font-semibold text-gray-900">
            {truncateText(name, 30)}
          </h3>

          <p className="text-sm text-muted-foreground mt-1">
            {truncateText(tagline, 60)}
          </p>

          <div className="mt-3 text-right">
            <p className="text-primary text-lg font-bold">
              {formatCurrency(price)}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default PropertyCard;
