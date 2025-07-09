import React from "react";
import { Skeleton } from "../ui/skeleton";

function Loading() {
  return (
    <section className="mt-4 grid gap-8 sm:grid-cols-2 md:grid-cols-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </section>
  );
}

export default Loading;

export function LoadingCard() {
  return (
    <div className="p-4 border rounded-lg shadow-sm space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
      </div>
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-[90%] rounded" />
      <Skeleton className="h-4 w-[80%] rounded" />
    </div>
  );
}
