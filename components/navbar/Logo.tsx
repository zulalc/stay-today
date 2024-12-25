import Link from "next/link";
import { Button } from "../ui/button";
import { HouseIcon } from "lucide-react";

function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-1">
      <Button size="icon" asChild>
        <div>
          <HouseIcon className="w-6 h-6" />
        </div>
      </Button>
      <span className="text-lg">staytoday</span>
    </Link>
  );
}

export default Logo;
