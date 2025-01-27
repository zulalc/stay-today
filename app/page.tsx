"use client";

import CategoriesList from "@/components/home/CategoriesList";
import { useSearchParams } from "next/navigation";

function HomePage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const search = searchParams.get("search") ?? undefined;
  return (
    <section>
      <CategoriesList category={category} search={search} />
    </section>
  );
}
export default HomePage;
