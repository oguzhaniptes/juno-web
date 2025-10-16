import React from "react";
import Image from "next/image";

interface AdCardProps {
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}

const AdCard: React.FC<AdCardProps> = ({ title, description, imageUrl, ctaText, ctaLink }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-500 uppercase">Advertisement</span>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
      <div className="mb-4">
        <Image src={imageUrl} alt={title} width={500} height={200} className="rounded-lg object-cover w-full" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-700 text-sm mb-4">{description}</p>
      <a
        href={ctaLink}
        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {ctaText}
      </a>
    </div>
  );
};

export default AdCard;
