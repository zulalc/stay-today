"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function NavbarSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchQuery = searchParams.get("search") || ""; // Extracted to a variable
  const [search, setSearch] = useState(searchQuery);

  // DebouncedCallback: Delays function execution to prevent excessive updates when typing.
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]); // Now tracking only the extracted variable

  return (
    <Input
      type="search"
      placeholder="Find a place to stay..."
      className="max-w-xs dark:bg-muted rounded-full px-4"
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
}

export default NavbarSearch;
