import React from "react";
import { Skeleton } from "../ui/skeleton";

function Loading() {
  return (
    <section className="mt-4 gap-8 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
    </section>
  );
}

export default Loading;

export function LoadingCard() {
  return (
    <div>
      <Skeleton className="h-[300px] rounded-md" />
    </div>
  );
}
