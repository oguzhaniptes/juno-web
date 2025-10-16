import React from "react";

const ProfileHeader = () => {
  return (
    <div className="flex flex-row justify-between bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
      <div className="flex flex-row gap-4">
        <div className="h-12 w-12 rounded-full bg-gray-400"></div>
        <div className="flex flex-col">
          <h1>Welcome</h1>
          <h1>Alex</h1>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <div className="h-6 rounded-full bg-gray-400">Diamond</div>
        <div className="h-6 rounded-full bg-gray-400">Gold</div>
      </div>
    </div>
  );
};

export default ProfileHeader;
