import { formatCurrency } from "@/utils/format";
import { PropertyProps } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

function PropertyCard({ property }: { property: PropertyProps }) {
  const { name, image, price } = property;
  const { country, id: propertyId, tagline } = property;
  return (
    <article className="group relative">
      <Link href={`/property/${propertyId}`}>
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
            {name.substring(0, 20)}
          </h3>
        </div>

        <p className="text-sm mt-1 text-muted-foreground">
          {tagline.substring(0, 50)}
        </p>

        <div className="flex justify-between items-center mt-1">
          <p className="text-sm">
            <span className="font-semibold">{formatCurrency(price)}</span>
            night
          </p>
        </div>
      </Link>
      <div className="absolute top-5 right-5 z-5"></div>
    </article>
  );
}

export default PropertyCard;
