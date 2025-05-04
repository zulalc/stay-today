import { UserInfoProps } from "@/utils/types";
import Image from "next/image";
import React from "react";

function UserInfo({ profile: { profileImage, firstName } }: UserInfoProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 w-full sm:w-auto">
      <div className="flex flex-col text-start sm:text-end flex-1">
        <p className="text-sm text-gray-800 dark:text-white">
          Hosted by <span className="font-bold">{firstName}</span>
        </p>

        <div className="flex gap-2 text-sm text-muted-foreground">
          <p className="font-medium">Superhost</p>
          &middot;
          <p className="font-light">Joined in 2020</p>
        </div>
      </div>
      <Image
        src={profileImage}
        alt={firstName}
        width={50}
        height={50}
        className="rounded-full w-12 h-12 object-cover border"
      />
    </div>
  );
}

export default UserInfo;
