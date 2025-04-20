import { UserInfoProps } from "@/utils/types";
import Image from "next/image";
import React from "react";

function UserInfo({ profile: { profileImage, firstName } }: UserInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col text-end">
        <p className="text-sm">
          Hosted by <span className="font-bold">{firstName}</span>
        </p>

        <div className="flex gap-2">
          <p className="text-sm text-muted-foreground font-medium">Superhost</p>
          &middot;
          <p className="text-sm text-muted-foreground font-light">
            Joined in 2020
          </p>
        </div>
      </div>
      <Image
        src={profileImage}
        alt={firstName}
        width={50}
        height={50}
        className="rounded-full w-12 h-12 object-cover"
      />
    </div>
  );
}

export default UserInfo;
