"use client";
import LoadingTable from "@/components/booking/Loading";
import { ActionButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import EmptyList from "@/components/home/EmptyList";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteRentalAction, fetchRentals } from "@/utils/actions";
import { RentalsProps } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";

function Rentals() {
  const [rentals, setRentals] = useState<RentalsProps[] | null>(null);
  useEffect(() => {
    fetchRentals()
      .then((data) => setRentals(data))
      .catch((error) => console.error("Error fetching rentals:", error));
  }, []);

  if (rentals === null) return <LoadingTable />;

  if (rentals.length === 0) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <EmptyList
          heading="No Rentals"
          message="Create your first rental property to get started"
        />
      </div>
    );
  }

  return (
    <div className="mt-14">
      <h4 className="mb-4 capitalize">Your Rentals: {rentals.length}</h4>
      <Table>
        <TableCaption>A list of all your properties.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Nights Booked</TableHead>
            <TableHead>Total Income</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rentals.map((rental) => {
            const { id: propertyId, name, price, country } = rental;
            const { totalNightSum, totalFeeSum } = rental;
            return (
              <TableRow key={propertyId}>
                <TableCell>
                  <Link
                    href={`/properties/${propertyId}`}
                    className="underline text-muted-foreground tracking-wide"
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{country}</TableCell>
                <TableCell>
                  {price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </TableCell>
                <TableCell>{totalNightSum ?? 0}</TableCell>
                <TableCell>
                  {totalFeeSum
                    ? totalFeeSum.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                    : "N/A"}
                </TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Link
                    href={`/rentals/${propertyId}/edit`}
                    className="text-violet-500 hover:underline"
                  >
                    <ActionButton actionType="edit"></ActionButton>
                  </Link>

                  <DeleteRental propertyId={propertyId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function DeleteRental({ propertyId }: { propertyId: string }) {
  const deleteRental = deleteRentalAction.bind(null, { propertyId });
  return (
    <FormContainer action={deleteRental}>
      <ActionButton actionType="delete" />
    </FormContainer>
  );
}

export default Rentals;
