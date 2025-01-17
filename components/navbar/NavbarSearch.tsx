import { Input } from "../ui/input";

function NavbarSearch() {
  return (
    <Input
      type="text"
      placeholder="Find a place to stay..."
      className="max-w-xs dark:bg-muted rounded-full px-4"
    />
  );
}

export default NavbarSearch;
