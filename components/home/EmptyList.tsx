import Link from "next/link";
import { Button } from "../ui/button";

function EmptyList({
  heading = "No data found",
  message = "Please try again later",
  btnText = "Return to home",
}: {
  heading?: string;
  message?: string;
  btnText?: string;
}) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">{heading}</h2>
      <p className="text-lg">{message}</p>
      <Button asChild className="mt-4 size='lg'">
        <Link href="/">{btnText}</Link>
      </Button>
    </div>
  );
}

export default EmptyList;
