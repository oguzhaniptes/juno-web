import React from "react";
import Image from "next/image";
import InteractionButtons from "./InteractionButtons";
import { ProfileAvatar } from "./ProfileAvatar";

interface PostCardProps {
  type: "news" | "user-post";
  category?: string; // e.g., "Football", "Sports"
  title?: string; // For news
  content: string;
  imageUrl?: string; // For news or user-post with image
  authorAvatarUrl?: string; // For user-post
  likes: number;
  comments: number;
  shares: number;
}

const PostCard: React.FC<PostCardProps> = ({ type, category, title, content, imageUrl, authorAvatarUrl, likes, comments, shares }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200">
      <div className="flex flex-col items-start justify-center gap-2">
        <div className="flex flex-row gap-2">
          <ProfileAvatar isHaveProfileNft={false} size="sm" />
          <div className="flex flex-col justify-center">
            <p className="text-md">Alex</p>
            <p className="text-sm text-gray-500">@alex</p>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-gray-700 text-sm mb-3">{content}</p>
        </div>
      </div>

      <InteractionButtons likes={likes} comments={comments} shares={shares} />
    </div>
  );
};

export default PostCard;
