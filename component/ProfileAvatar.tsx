import React from "react";

interface ProfileAvatarProps {
  size?: "sm" | "md" | "lg";
  isHaveProfileNft?: boolean;
}

export const ProfileAvatar = ({ isHaveProfileNft, size }: ProfileAvatarProps) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full ${size == "sm" ? "h-14 w-14" : size == "md" ? "h-16 w-16" : "h-20 w-20"} ${
        isHaveProfileNft ? "bg-gradient-to-tr from-purple-500 via-pink-500 to-red-500 p-0.5" : ""
      }`}
    >
      <div className={`rounded-full bg-gray-100 ${size == "sm" ? "h-12 w-12" : size == "md" ? "h-14 w-14" : "h-18 w-18"}`}></div>
    </div>
  );
};
