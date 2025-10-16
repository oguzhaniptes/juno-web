import React from "react";
import Image from "next/image";

interface Team {
  name: string;
  logo: string;
}

interface LiveMatchCardProps {
  sport: "football" | "basketball" | "tennis";
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: string; // e.g., "Halftime", "Q2", "Set 3"
}

const LiveMatchCard: React.FC<LiveMatchCardProps> = ({ sport: _sport, homeTeam, awayTeam, homeScore, awayScore, status }) => {
  return (
    <div className="flex-none w-80 bg-card rounded-2xl shadow-md p-4 relative overflow-hidden border border-gray-200">
      {/* Live Indicator */}
      <span className="absolute top-2 right-2 flex items-center text-red-600 text-xs font-semibold">
        <span className="relative flex h-2 w-2 mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        Live
      </span>

      <div className="flex items-center justify-between mt-4">
        {/* Home Team */}
        <div className="flex flex-col items-center flex-1">
          <Image src={homeTeam.logo} alt={homeTeam.name.slice(0, 1)} width={48} height={48} className="rounded-full bg-white p-1 border" />
          <span className="text-gray-900 text-sm font-medium mt-2 text-center">{homeTeam.name}</span>
        </div>

        {/* Score */}
        <div className="flex-none mx-4">
          <p className="text-gray-900 text-4xl font-bold text-center">
            {homeScore} - {awayScore}
          </p>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center flex-1">
          <Image src={awayTeam.logo} alt={awayTeam.name.slice(0, 1)} width={48} height={48} className="rounded-full bg-white p-1 border" />
          <span className="text-gray-900 text-sm font-medium mt-2 text-center">{awayTeam.name}</span>
        </div>
      </div>

      {/* Match Status */}
      <div className="text-gray-500 text-xs text-center mt-4">{status}</div>
    </div>
  );
};

export default LiveMatchCard;
