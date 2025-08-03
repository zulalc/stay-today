type NavLink = {
  href: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/favorites", label: "Favorites" },
  { href: "/bookings", label: "Bookings" },
  { href: "/rentals", label: "Rentals" },
  { href: "/rentals/create", label: "Create Rental" },
  { href: "/reviews", label: "Reviews" },
];
