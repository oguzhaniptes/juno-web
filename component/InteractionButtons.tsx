import React from "react";
import { Chart, Heart, Message, Share } from "./icons";

interface InteractionButtonsProps {
  likes: number;
  comments: number;
  shares: number;
  viewAnaltics?: number;
}

const InteractionButtons = ({ likes = 100, comments = 100, shares = 100 }: InteractionButtonsProps) => {
  return (
    <div className="flex items-center justify-around mt-4 pt-4 text-gray-600">
      <div className="flex items-center text-sm">
        <Heart className="w-5 h-5 mr-1" />
        <span>{likes}</span>
      </div>
      <div className="flex items-center text-sm">
        <Message className="w-5 h-5 mr-1" />
        <span>{comments}</span>
      </div>
      <div className="flex items-center text-sm">
        <Share className="w-5 h-5 mr-1" />
        <span>{shares}</span>
      </div>
      <div className="flex items-center text-sm">
        <Chart className="w-5 h-5 mr-1" />
        <span>{shares}</span>
      </div>
    </div>
  );
};

export default InteractionButtons;
