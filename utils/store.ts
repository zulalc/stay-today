import { DateRange } from "react-day-picker";
import { BookingProps } from "./types";
import { create } from "zustand";

type PropertyState = {
  propertyId: string;
  price: number;
  bookings: BookingProps[];
  range: DateRange | undefined;
};

export const useProperty = create<PropertyState>(() => {
  //state management
  return {
    propertyId: "",
    price: 0,
    bookings: [],
    range: undefined,
  };
});
