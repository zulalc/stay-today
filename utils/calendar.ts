import { DateRange } from "react-day-picker";
import { BookingProps } from "./types";

export const defaultSelected: DateRange = {
  from: undefined,
  to: undefined,
};

export function calculateDaysBetween({
  checkIn,
  checkOut,
}: {
  checkIn: Date;
  checkOut: Date;
}): number {
  //difference in milliseconds
  const diffMs = Math.abs(checkOut.getTime() - checkIn.getTime());

  // Convert the difference in milliseconds to days
  return diffMs / (1000 * 60 * 60 * 24);
}

export const disabledDates = ({
  //blocked
  bookings,
  today,
}: {
  bookings: BookingProps[];
  today: Date;
}) => {
  today.setHours(0, 0, 0, 0); // Normalize today's date to midnight

  const disabledDates: DateRange[] = [
    ...bookings.map((booking) => ({
      from: booking.checkIn,
      to: booking.checkOut,
    })),
    {
      from: new Date(0), // 01 January 1970
      to: new Date(today.getTime() - 24 * 60 * 60 * 1000), // Yesterday
    },
  ];
  return disabledDates;
};

export const unavailableDates = (
  //disabled
  unavailableDates: DateRange[]
): { [key: string]: boolean } => {
  if (!unavailableDates || unavailableDates.length === 0) return {};

  const unavailableDatesMap: { [key: string]: boolean } = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date to midnight

  unavailableDates.forEach((dateRange) => {
    if (!dateRange.from || !dateRange.to) return;

    let currentDate = new Date(dateRange.from);
    const endDate = new Date(dateRange.to);

    while (currentDate <= endDate) {
      if (currentDate < today) {
        currentDate.setDate(currentDate.getDate() + 1);
        continue;
      }
      const dateString = currentDate.toISOString().split("T")[0];
      unavailableDatesMap[dateString] = true;
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return unavailableDatesMap;
};

export const isDateInRange = (range: DateRange | undefined): string[] => {
  if (!range || !range.from || !range.to) return [];

  const dates: string[] = [];
  let currentDate = new Date(range.from);
  const endDate = new Date(range.to);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export function daysBetween({
  checkIn,
  checkOut,
}: {
  checkIn: Date;
  checkOut: Date;
}) {
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
