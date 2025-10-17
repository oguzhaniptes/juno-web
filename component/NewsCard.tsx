import React from "react";
import Image from "next/image";
import { Badge } from "./ui/Badge";
import InteractionButtons from "./InteractionButtons";

interface NewsCardProps {
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

const NewsCard: React.FC<NewsCardProps> = ({ type, category, title, content, imageUrl, authorAvatarUrl, likes, comments, shares }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200">
      <Badge className="absolute right-2 top-2" variant={"success"} size={"sm"}>
        {category}
      </Badge>
      <div className="flex justify-between items-start mb-3">
        <div>{title && <h3 className="text-xl font-bold text-gray-900 mt-1 leading-tight">{title}</h3>}</div>
      </div>
      <p className="text-gray-700 text-sm">{content}</p>
      <InteractionButtons likes={likes} comments={comments} shares={shares} />
    </div>
  );
};

export default NewsCard;
