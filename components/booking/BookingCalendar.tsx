"use client";

import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import {
  defaultSelected,
  disabledDates,
  isDateInRange,
  unavailableDates,
} from "@/utils/calendar";
import { useProperty } from "@/utils/store";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

export default function BookingCalendar() {
  const currentDate = new Date();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  const bookings = useProperty((state) => state.bookings);
  const disabledDays = disabledDates({
    bookings,
    today: currentDate,
  });

  const { toast } = useToast();
  const unavailableDays = unavailableDates(disabledDays);

  useEffect(() => {
    const selectedRange = isDateInRange(range);
    const isUnavailableIncluded = selectedRange.some((date) => {
      if (unavailableDays[date]) {
        setRange(defaultSelected);
        toast({
          title: "Unavailable Dates",
          description: "The selected date range includes unavailable dates.",
          variant: "destructive",
        });

        return true;
      }
      return false;
    });

    useProperty.setState({ range });
  }, [range]);

  return (
    <Calendar
      id="booking-calendar"
      mode="range"
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      disabled={disabledDays}
    />
  );
}
