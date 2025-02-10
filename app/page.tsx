"use client";

import CategoriesList from "@/components/home/CategoriesList";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import { useSearchParams } from "next/navigation";

function HomePage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const search = searchParams.get("search") ?? undefined;
  return (
    <section>
      <CategoriesList category={category} search={search} />
      <PropertiesContainer category={category} search={search} />
    </section>
  );
}
export default HomePage;
