import CategoriesList from "@/components/home/CategoriesList";

function HomePage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  return (
    <section>
      <CategoriesList
        category={searchParams?.category}
        search={searchParams?.search}
      />
    </section>
  );
}
export default HomePage;
