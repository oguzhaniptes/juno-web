"use client";

import { useState } from "react";

export default function CommunityPage() {
  const [showAllUserCommunities, setShowAllUserCommunities] = useState(false);
  const userCommunities = [
    {
      id: 1,
      name: "Madridistas",
      members: 12840,
      description: "Real Madrid fans worldwide.",
      cover: "/images/real_madrid_champions.png",
    },
    {
      id: 2,
      name: "NBA Talk",
      members: 53210,
      description: "Daily hoops banter and insights.",
      cover: "/images/warriors_champions.png",
    },
    {
      id: 7,
      name: "Arsenal Gooners",
      members: 21450,
      description: "North London is red. Matches, memes, transfers.",
      cover: "/images/arsenal_logo.png",
    },
    {
      id: 8,
      name: "Lakers Nation",
      members: 60231,
      description: "LA hoops. Game threads, highlights, history.",
      cover: "/images/lakers_logo.png",
    },
    {
      id: 9,
      name: "Tennis Talk",
      members: 17420,
      description: "ATP/WTA debates, tour news, and rankings.",
      cover: "/images/djokovic_logo.png",
    },
    {
      id: 10,
      name: "Premier Banter",
      members: 31290,
      description: "EPL chatter, weekly matchday threads.",
      cover: "/images/chelsea_logo.png",
    },
    {
      id: 11,
      name: "EuroBall",
      members: 12980,
      description: "UEFA nights, transfers, and rumors.",
      cover: "/images/real_madrid_champions.png",
    },
  ];

  const activeMatchCommunities = [
    {
      id: 3,
      name: "Premier League Live",
      members: 40211,
      description: "Live chat for today's fixtures.",
      cover: "/images/chelsea_logo.png",
    },
    {
      id: 4,
      name: "US Open Watch",
      members: 9870,
      description: "Set-by-set tennis reactions.",
      cover: "/images/djokovic_logo.png",
    },
  ];

  const suggestedCommunities = [
    {
      id: 5,
      name: "Tactics & Analysis",
      members: 22145,
      description: "Deep dives into strategy and plays.",
      cover: "/images/basketball_post.png",
    },
    {
      id: 6,
      name: "FPL Pros",
      members: 15190,
      description: "Fantasy tips, lineups and waivers.",
      cover: "/images/ad_fantasy.png",
    },
  ];

  const CommunityCard = ({ name, members, description, cover }: { name: string; members: number; description: string; cover: string }) => (
    <div className="relative bg-card rounded-lg shadow-md border border-gray-200 p-4 flex">
      <div className="flex-shrink-0 mr-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover} alt={name} className="h-16 w-16 rounded-lg object-cover bg-gray-100" />
      </div>
      <div className="flex-1 pr-20">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">{name}</h3>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{members.toLocaleString()} members</p>
        <p className="text-sm text-gray-700 mt-2 line-clamp-2">{description}</p>
      </div>
      <div className="absolute bottom-4 right-4">
        <button className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm">Join</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Communities</h1>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-gray-900">Your communities ({userCommunities.length})</h2>
            <button onClick={() => setShowAllUserCommunities((v) => !v)} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              {showAllUserCommunities ? "Show less" : "See all"}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(showAllUserCommunities ? userCommunities : userCommunities.slice(0, 4)).map((c) => (
              <CommunityCard key={c.id} name={c.name} members={c.members} description={c.description} cover={c.cover} />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-gray-900">Active match communities</h2>
            <a href="/community" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Explore more
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeMatchCommunities.map((c) => (
              <CommunityCard key={c.id} name={c.name} members={c.members} description={c.description} cover={c.cover} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-gray-900">Suggested communities</h2>
            <a href="/community" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Explore more
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestedCommunities.map((c) => (
              <CommunityCard key={c.id} name={c.name} members={c.members} description={c.description} cover={c.cover} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
