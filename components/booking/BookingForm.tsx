import { calculateTotals } from "@/utils/calculateFee";
import { useProperty } from "@/utils/store";
import { Card, CardTitle } from "../ui/card";
import { formatCurrency } from "@/utils/format";
import { Separator } from "../ui/separator";

function BookingForm() {
  const { range, price } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

  const { totalNights, subTotal, cleaning, service, tax, totalFee } =
    calculateTotals({
      checkIn,
      checkOut,
      price,
    });

  return (
    <Card className="w-full max-w-md p-6">
      <CardTitle className="text-lg font-semibold mb-4">
        Booking Summary
      </CardTitle>
      <p className="flex justify-between text-sm mb-2">
        <span>
          ${price} x {totalNights} nights
        </span>
        <span>{formatCurrency(subTotal)}</span>
      </p>
      <p className="flex justify-between text-sm mb-2">
        <span>Cleaning Fee</span>
        <span>{formatCurrency(cleaning)}</span>
      </p>
      <p className="flex justify-between text-sm mb-2">
        <span>Service Fee</span>
        <span>{formatCurrency(service)}</span>
      </p>
      <p className="flex justify-between text-sm mb-2">
        <span>Tax</span>
        <span>{formatCurrency(tax)}</span>
      </p>
      <Separator className="mt-4" />

      <CardTitle className="text-lg font-semibold mt-4">
        <p className="flex justify-between text-sm mb-2">
          <span>Booking Total Fee</span>
          <span>{formatCurrency(totalFee)}</span>
        </p>
      </CardTitle>
    </Card>
  );
}

export default BookingForm;
