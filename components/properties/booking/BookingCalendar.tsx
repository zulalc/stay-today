"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function BookingCalendar() {
  const currentDate = new Date();
  const defaultSelect: DateRange = {
    from: undefined,
    to: undefined,
  };

  const [range, setRange] = useState<DateRange | undefined>(defaultSelect);
  return (
    <Calendar
      id="booking-calendar"
      mode="range"
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
    />
  );
}
