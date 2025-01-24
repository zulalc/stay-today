import {
  FaBath,
  FaDog,
  FaDumbbell,
  FaParking,
  FaSwimmingPool,
  FaUtensils,
  FaWifi,
  FaWind,
} from "react-icons/fa";
import {
  GiElevator,
  GiWashingMachine,
  GiWeightLiftingUp,
} from "react-icons/gi";
import { IconType } from "react-icons/lib";
import { MdOutdoorGrill, MdSmokeFree } from "react-icons/md";
export type Amenity = {
  name: string;
  icon: IconType;
  selected: boolean;
};

export const amenities: Amenity[] = [
  { name: "Wifi", icon: FaWifi, selected: false },
  { name: "Parking", icon: FaParking, selected: false },
  { name: "Swimming Pool", icon: FaSwimmingPool, selected: false },
  { name: "Private Bathroom", icon: FaBath, selected: false },
  { name: "Gym", icon: FaDumbbell, selected: false },
  { name: "Pet Friendly", icon: FaDog, selected: false },
  { name: "Kitchen", icon: FaUtensils, selected: false },
  { name: "Washing Machine", icon: GiWashingMachine, selected: false },
  { name: "Air Conditioning", icon: FaWind, selected: false },
  { name: "Elevator", icon: GiElevator, selected: false },
  { name: "Non-Smoking", icon: MdSmokeFree, selected: false },
  { name: "Outdoor Grill", icon: MdOutdoorGrill, selected: false },
];
