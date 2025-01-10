import Link from "next/link";
import { Button } from "../ui/button";
import { HouseIcon } from "lucide-react";

function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-1">
      <Button size="icon" className="rounded-full" asChild>
        <div>
          <HouseIcon className="w-8 h-8" />
        </div>
      </Button>
      <span className="text-lg">staytoday</span>
    </Link>
  );
}

export default Logo;
