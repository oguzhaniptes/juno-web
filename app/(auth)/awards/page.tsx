"use client";

import { useState } from "react";

type Leader = {
  id: number;
  name: string;
  avatar: string;
  earningsUsd: number;
  points: number;
};

export default function AwardsPage() {
  const [tab, setTab] = useState<"current" | "lastWeek">("current");

  const currentLeaders: Leader[] = [
    { id: 1, name: "Aylin Demir", avatar: "/images/real_madrid_champions.png", earningsUsd: 1520, points: 980 },
    { id: 2, name: "Mert Yılmaz", avatar: "/images/warriors_champions.png", earningsUsd: 1310, points: 920 },
    { id: 3, name: "Zeynep Kaya", avatar: "/images/basketball_post.png", earningsUsd: 1090, points: 870 },
    { id: 4, name: "Ahmet Çetin", avatar: "/images/chelsea_logo.png", earningsUsd: 880, points: 820 },
    { id: 5, name: "Ece Koç", avatar: "/images/djokovic_logo.png", earningsUsd: 770, points: 790 },
    { id: 6, name: "Onur Can", avatar: "/images/arsenal_logo.png", earningsUsd: 640, points: 760 },
    { id: 7, name: "Seda Acar", avatar: "/images/lakers_logo.png", earningsUsd: 590, points: 740 },
    { id: 8, name: "Seda Acar", avatar: "/images/lakers_logo.png", earningsUsd: 590, points: 740 },
    { id: 9, name: "Seda Acar", avatar: "/images/lakers_logo.png", earningsUsd: 590, points: 740 },
    { id: 10, name: "Seda Acar", avatar: "/images/lakers_logo.png", earningsUsd: 590, points: 740 },
  ];

  const lastWeekLeaders: Leader[] = [
    { id: 1, name: "Aylin Demir", avatar: "/images/real_madrid_champions.png", earningsUsd: 1380, points: 930 },
    { id: 2, name: "Zeynep Kaya", avatar: "/images/basketball_post.png", earningsUsd: 1210, points: 900 },
    { id: 3, name: "Mert Yılmaz", avatar: "/images/warriors_champions.png", earningsUsd: 1170, points: 880 },
    { id: 4, name: "Ece Koç", avatar: "/images/djokovic_logo.png", earningsUsd: 860, points: 810 },
    { id: 5, name: "Ahmet Çetin", avatar: "/images/chelsea_logo.png", earningsUsd: 810, points: 790 },
    { id: 6, name: "Onur Can", avatar: "/images/arsenal_logo.png", earningsUsd: 620, points: 750 },
    { id: 7, name: "Seda Acar", avatar: "/images/lakers_logo.png", earningsUsd: 590, points: 740 },
    { id: 8, name: "Seda Acar", avatar: "/images/lakers_logo.png", earningsUsd: 590, points: 740 },
    { id: 9, name: "Seda Acar", avatar: "/images/lakers_logo.png", earningsUsd: 590, points: 740 },
    { id: 10, name: "Seda Acar", avatar: "/images/lakers_logo.png", earningsUsd: 590, points: 740 },
  ];

  const leaders = tab === "current" ? currentLeaders : lastWeekLeaders;
  const top3 = leaders.slice(0, 3);
  const rest = leaders.slice(3);

  const tierStyles = [
    { badge: "Gold", color: "bg-yellow-400", ring: "ring-yellow-400", height: "h-40", avatar: "h-24 w-24" },
    { badge: "Silver", color: "bg-gray-300", ring: "ring-gray-300", height: "h-32", avatar: "h-20 w-20" },
    { badge: "Bronze", color: "bg-orange-300", ring: "ring-orange-300", height: "h-28", avatar: "h-16 w-16" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Awards</h1>
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-0.5">
            <button
              onClick={() => setTab("current")}
              className={`px-4 py-2 text-sm rounded-md ${tab === "current" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
            >
              Current
            </button>
            <button
              onClick={() => setTab("lastWeek")}
              className={`px-4 py-2 text-sm rounded-md ${tab === "lastWeek" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
            >
              Last week
            </button>
          </div>
        </div>

        {/* Podium */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-3 items-end gap-4">
            {/* Silver - left */}
            <div className="flex flex-col items-center justify-end">
              <div className="relative flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={top3[1].avatar} alt={top3[1].name} className={`rounded-full object-cover ring-4 ${tierStyles[1].ring} ${tierStyles[1].avatar}`} />
                <span className="mt-2 text-sm font-semibold text-gray-700">{top3[1].name}</span>
                <div className="text-xs text-gray-500">
                  ${top3[1].earningsUsd.toLocaleString()} • {top3[1].points} pts
                </div>
              </div>
              <div className={`mt-3 w-full ${tierStyles[1].height} ${tierStyles[1].color} rounded-md`}></div>
            </div>

            {/* Gold - center */}
            <div className="flex flex-col items-center justify-end">
              <div className="relative flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={top3[0].avatar} alt={top3[0].name} className={`rounded-full object-cover ring-4 ${tierStyles[0].ring} ${tierStyles[0].avatar}`} />
                <span className="mt-2 text-base font-bold text-gray-900">{top3[0].name}</span>
                <div className="text-sm text-gray-700 font-medium">
                  ${top3[0].earningsUsd.toLocaleString()} • {top3[0].points} pts
                </div>
              </div>
              <div className={`mt-3 w-full ${tierStyles[0].height} ${tierStyles[0].color} rounded-md`}></div>
            </div>

            {/* Bronze - right */}
            <div className="flex flex-col items-center justify-end">
              <div className="relative flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={top3[2].avatar} alt={top3[2].name} className={`rounded-full object-cover ring-4 ${tierStyles[2].ring} ${tierStyles[2].avatar}`} />
                <span className="mt-2 text-sm font-semibold text-gray-700">{top3[2].name}</span>
                <div className="text-xs text-gray-500">
                  ${top3[2].earningsUsd.toLocaleString()} • {top3[2].points} pts
                </div>
              </div>
              <div className={`mt-3 w-full ${tierStyles[2].height} ${tierStyles[2].color} rounded-md`}></div>
            </div>
          </div>
        </div>

        {/* Ranks 4+ */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="divide-y divide-gray-100">
            {rest.map((u, idx) => (
              <div key={u.id} className="flex items-center p-4">
                <div className="w-10 text-sm font-semibold text-gray-500">{idx + 4}</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={u.avatar} alt={u.name} className="h-10 w-10 rounded-full object-cover" />
                <div className="ml-3 flex-1">
                  <div className="text-sm font-medium text-gray-900">{u.name}</div>
                  <div className="text-xs text-gray-500">
                    ${u.earningsUsd.toLocaleString()} • {u.points} pts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
