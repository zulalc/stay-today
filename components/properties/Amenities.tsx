import { Amenity } from "@/utils/amenities";
import React from "react";
import Title from "./Title";
import { FaCheckCircle } from "react-icons/fa";

function Amenities({ amenities }: { amenities: string }) {
  const amenityList: Amenity[] = JSON.parse(amenities as string);
  const noAmenities = amenityList.every((amenity) => !amenity.selected);
  if (noAmenities) return null;

  return (
    <div className="mt-4">
      <Title text="What this place offers" />
      <div className="grid md:grid-cols-2 gap-x-4">
        {amenityList.map((amenity) => {
          if (!amenity.selected) {
            return null;
          }
          return (
            <div key={amenity.name} className="flex items-center gap-x-4 mb-2 ">
              <FaCheckCircle className="h-6 w-6 text-primary" />
              <span className="font-light text-sm capitalize">
                {amenity.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Amenities;
