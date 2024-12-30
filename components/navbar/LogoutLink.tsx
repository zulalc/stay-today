"use client";

import { useToast } from "@/hooks/use-toast";
import { SignOutButton } from "@clerk/nextjs";

function LogoutLink() {
  const { toast } = useToast();
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out.",
    });
  };
  return (
    <SignOutButton redirectUrl="/">
      <button className="w-full text-left" onClick={handleLogout}>
        Logout
      </button>
    </SignOutButton>
  );
}

export default LogoutLink;
