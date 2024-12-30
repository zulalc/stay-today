import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { TbAlignLeft } from "react-icons/tb";
import UserIcon from "./UserIcon";
import { navLinks } from "@/utils/links";
import Link from "next/link";
import LogoutLink from "./LogoutLink";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-[100px]">
          <TbAlignLeft className="w-6 h-6" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" sideOffset={10} className="w-52">
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full text-left">Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full text-left">Sign up</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {navLinks.map((link) => {
            return (
              <DropdownMenuItem key={link.href}>
                <Link href={link.href} className="capitalize w-full">
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropdown;
