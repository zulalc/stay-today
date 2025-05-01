import NavbarSearch from "./NavbarSearch";
import LinksDropdown from "./LinksDropdown";
import DarkMode from "./DarkMode";
import Logo from "./Logo";

function Navbar() {
  return (
    <nav className="border-b">
      <div className="container flex flex-col gap-4 py-4 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex justify-between items-center">
          <Logo />
          {/* Shown on mobile */}
          <div className="flex items-center gap-3 sm:hidden">
            <DarkMode />
            <LinksDropdown />
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <NavbarSearch />
        </div>
        {/* Shown on desktop */}
        <div className="hidden sm:flex gap-4 items-center">
          <DarkMode />
          <LinksDropdown />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
