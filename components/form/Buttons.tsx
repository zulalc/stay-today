"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SignInButton } from "@clerk/nextjs";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import clsx from "clsx";
import { FaPenSquare, FaTrashAlt } from "react-icons/fa";

type btnSize = "default" | "sm" | "lg";

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

type actionType = "edit" | "delete";

export function SubmitButton({
  className = "",
  text = "submit",
  size = "lg",
}: SubmitButtonProps) {
  const { pending } = useFormStatus(); //status info of last form submission
  return (
    <Button type="submit" size={size} className={className} disabled={pending}>
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export const CardSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className="p-2 cursor-pointer"
        asChild
      >
        <BsHeartFill
          className={clsx(
            "drop-shadow-[0_0_2px_rgba(255,255,255,0.8)] group-hover:text-gray-900 transition-all"
          )}
        />
      </Button>
    </SignInButton>
  );
};

type CardSubmitButtonProps = {
  isFavorite: boolean;
  variant?: "favtogglebutton" | "ghost";
};

export const CardSubmitButton = ({
  isFavorite,
  variant = "favtogglebutton",
}: CardSubmitButtonProps) => {
  console.log("Button variant3:", variant);
  const { pending } = useFormStatus();
  const textColor = variant === "ghost" ? "text-black" : "text-white";

  return (
    <Button
      type="submit"
      size="icon"
      variant={variant}
      className="cursor-pointer"
    >
      {pending ? (
        <ReloadIcon className="h-4 w-4 text-white animate-spin" />
      ) : isFavorite ? (
        <BsHeartFill
          className={clsx(
            "drop-shadow-[0_0_2px_rgba(255,255,255,0.8)] group-hover:text-gray-900 transition-all",
            textColor
          )}
        />
      ) : (
        <BsHeart
          className={clsx(
            "drop-shadow-[0_0_2px_rgba(255,255,255,0.8)] group-hover:text-gray-900 transition-all",
            textColor
          )}
        />
      )}
    </Button>
  );
};

export const ActionButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className="p-2 cursor-pointer"
    >
      {pending ? (
        <ReloadIcon className="h-4 w-4 animate-spin" />
      ) : actionType === "edit" ? (
        <FaPenSquare />
      ) : (
        <FaTrashAlt className="text-red-500" />
      )}
    </Button>
  );
};
