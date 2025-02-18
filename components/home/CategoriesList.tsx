import { categories } from "@/utils/categories";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";

function CategoriesList({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const searchWord = search ? `&search=${search}` : "";

  return (
    <section className="w-full max-w-screen-lg mx-auto">
      <ScrollArea className="p-4 w-full overflow-x-auto">
        <ScrollBar orientation="horizontal" />
        <div className="flex gap-x-4 w-max">
          {categories.map((cat) => {
            const isActive = cat.label === category;
            return (
              <Link
                key={cat.label}
                href={`/?category=${cat.label}${searchWord}`}
              >
                <article
                  className={`p-4 flex flex-col items-center text-center cursor-pointer duration-300 hover:text-primary w-[100px] ${
                    isActive ? "text-primary " : ""
                  }`}
                >
                  <cat.icon className="w-8 h-8" />
                  <span className="mt-2 text-sm text-center capitalize">
                    {cat.label}
                  </span>
                </article>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </section>
  );
}

export default CategoriesList;
