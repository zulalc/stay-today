import React from "react";
import { Skeleton } from "../ui/skeleton";

function Loading() {
  return (
    <section className="mt-4 grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </section>
  );
}

export default Loading;

export function LoadingCard() {
  return (
    <div className="space-y-2">
      {/* Image */}
      <Skeleton className="h-[280px] rounded-lg" />

      {/* country + rating */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-4 w-12 rounded" />
      </div>

      {/* Name/title */}
      <Skeleton className="h-4 w-32 rounded" />

      {/* Tagline + price */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-40 rounded" />
        <Skeleton className="h-4 w-16 rounded" />
      </div>
    </div>
  );
}
