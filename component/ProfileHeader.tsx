import React from "react";
import { Coin, Diamond } from "@/component/icons";
import { ProfileAvatar } from "./ProfileAvatar";

const ProfileHeader = () => {
  return (
    <div className="flex flex-row justify-between bg-white border border-gray-200 rounded-2xl shadow-sm px-8 py-4">
      <div className="flex flex-row gap-4">
        <ProfileAvatar isHaveProfileNft={true} />
        <div className="flex flex-col">
          <h1>Welcome</h1>
          <h1>Alex</h1>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center gap-2 h-6 px-2 py-4 rounded-full bg-blue-100/50">
          <Diamond className="stroke-blue-500" />
          <p className="text-blue-700 font-medium">120</p>
        </div>
        <div className="flex flex-row items-center gap-2 h-6 px-2 py-4 rounded-full bg-amber-100/50">
          <Coin className="stroke-amber-500" />
          <p className="text-amber-700 font-medium">2500</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
