import React from "react";
import Image from "next/image";

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
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          {title && <h3 className="text-xl font-bold text-gray-900 mt-1 leading-tight">{title}</h3>}
          {category && <span className="text-xs font-semibold text-blue-600 uppercase">{category}</span>}
        </div>
        {/* {imageUrl && (
          <div className="flex-shrink-0 ml-4">
            <Image src={imageUrl} alt={title || "News image"} width={96} height={96} className="rounded-lg object-cover" />
          </div>
        )} */}
      </div>
      <p className="text-gray-700 text-sm">{content}</p>

      <div className="flex items-center justify-around mt-4 pt-4 border-t border-gray-100 text-gray-600">
        <div className="flex items-center text-sm">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
          <span>{likes}</span>
        </div>
        <div className="flex items-center text-sm">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          <span>{comments}</span>
        </div>
        <div className="flex items-center text-sm">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            ></path>
          </svg>
          <span>{shares}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
