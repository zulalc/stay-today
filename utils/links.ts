type NavLink = {
  href: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/favorites", label: "Favorites" },
  { href: "/bookings", label: "Bookings" },
  { href: "/reviews", label: "Reviews" },
  { href: "/rentals/create", label: "Create Rental" },
  { href: "/rentals", label: "My Rentals" },
];
