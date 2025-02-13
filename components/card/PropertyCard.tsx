import { formatCurrency } from "@/utils/format";
import { PropertyProps } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import PropertyRating from "./PropertyRating";
import FavToggleButton from "./FavToggleButton";
import CountryDetails from "./CountryDetails";

function PropertyCard({ property }: { property: PropertyProps }) {
  const { name, image, price } = property;
  const { country, id: propertyId, tagline } = property;

  const truncateText = (text: string, length: number) =>
    text.length > length ? text.substring(0, length) + "..." : text;

  return (
    <article className="group relative">
      <Link href={`/properties/${propertyId}`}>
        <div className="relative h-[300px] mb-2 overflow-hidden rounded-md">
          <Image
            src={image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            alt={name}
            className="object-cover rounded-md transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold mt-1">
            {truncateText(name, 20)}
          </h3>
          <PropertyRating inPage={false} propertyId={propertyId} />
        </div>

        <p className="text-sm mt-1 text-muted-foreground">
          {truncateText(tagline, 50)}
        </p>

        <div className="flex justify-between items-center mt-1">
          <p className="text-sm">
            <span className="font-semibold mr-1">{formatCurrency(price)}</span>
            night
          </p>
          <CountryDetails countryCode={country} />
        </div>
      </Link>
      <div className="absolute top-5 right-5 z-5">
        <FavToggleButton propertyId={propertyId} />
      </div>
    </article>
  );
}

export default PropertyCard;
