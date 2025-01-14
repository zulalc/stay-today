import { FaHome, FaWarehouse } from "react-icons/fa";
import { MdApartment, MdCottage } from "react-icons/md";
import {
  GiVillage,
  GiWoodCabin,
  GiCampingTent,
  GiCaravan,
  GiHut,
} from "react-icons/gi";
import { RiCaravanFill } from "react-icons/ri";
import { IconType } from "react-icons/lib";
import { TbContainer } from "react-icons/tb";
import { BsHouseDoor } from "react-icons/bs";

type Category = {
  label: string;
  icon: IconType;
};

export type CategoryType =
  | "entire_home"
  | "apartment"
  | "villa"
  | "cabin"
  | "tent"
  | "airstream"
  | "cottage"
  | "container"
  | "caravan"
  | "tiny"
  | "warehouse"
  | "lodge";

export const categories: Category[] = [
  {
    label: "Entire Home",
    icon: FaHome,
  },
  {
    label: "Apartment",
    icon: MdApartment,
  },
  {
    label: "Villa",
    icon: GiVillage,
  },
  {
    label: "Cabin",
    icon: GiWoodCabin,
  },
  {
    label: "Tent",
    icon: GiCampingTent,
  },
  {
    label: "Airstream",
    icon: RiCaravanFill,
  },
  {
    label: "Cottage",
    icon: MdCottage,
  },
  {
    label: "Container",
    icon: TbContainer,
  },
  {
    label: "Caravan",
    icon: GiCaravan,
  },
  {
    label: "Tiny Home",
    icon: BsHouseDoor,
  },
  {
    label: "Warehouse",
    icon: FaWarehouse,
  },
  {
    label: "Lodge",
    icon: GiHut,
  },
];
