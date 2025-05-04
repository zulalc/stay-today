import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-1/3 rounded" />

        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>

      <Skeleton className="h-[300px] md:h-[500px] w-full rounded" />
    </div>
  );
}

export default Loading;
