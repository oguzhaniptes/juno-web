"use client";

import { useSession } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import LiveMatchCard from "@/component/LiveMatchCard";
import PostCard from "@/component/PostCard";
import AdCard from "@/component/AdCard";
import ProfileHeader from "@/component/ProfileHeader";
import NewsCard from "@/component/NewsCard";
import { Separator } from "@/component/ui/Separator";

export default function DashboardPage() {
  const { authData, isLoading } = useSession();
  const router = useRouter();

  interface Team {
    name: string;
    logo: string;
  }

  interface Match {
    sport: "football" | "basketball" | "tennis";
    homeTeam: Team;
    awayTeam: Team;
    homeScore: number;
    awayScore: number;
    status: string;
  }

  const liveMatches: Match[] = [
    {
      sport: "football",
      homeTeam: { name: "Chelsea", logo: "/images/chelsea_logo.png" },
      awayTeam: { name: "Arsenal", logo: "/images/arsenal_logo.png" },
      homeScore: 2,
      awayScore: 1,
      status: "Halftime",
    },
    {
      sport: "football",
      homeTeam: { name: "Chelsea", logo: "/images/chelsea_logo.png" },
      awayTeam: { name: "Arsenal", logo: "/images/arsenal_logo.png" },
      homeScore: 2,
      awayScore: 1,
      status: "Halftime",
    },
    {
      sport: "football",
      homeTeam: { name: "Chelsea", logo: "/images/chelsea_logo.png" },
      awayTeam: { name: "Arsenal", logo: "/images/arsenal_logo.png" },
      homeScore: 2,
      awayScore: 1,
      status: "Halftime",
    },
    {
      sport: "basketball",
      homeTeam: { name: "Lakers", logo: "/images/lakers_logo.png" },
      awayTeam: { name: "Celtics", logo: "/images/celtics_logo.png" },
      homeScore: 88,
      awayScore: 92,
      status: "Q3 - 05:30",
    },
    {
      sport: "tennis",
      homeTeam: { name: "Djokovic", logo: "/images/djokovic_logo.png" },
      awayTeam: { name: "Alcaraz", logo: "/images/alcaraz_logo.png" },
      homeScore: 1,
      awayScore: 2,
      status: "Set 4 - 3:4",
    },
  ];

  const feedItems = [
    {
      id: 1,
      type: "news",
      category: "Football",
      title: "Real Madrid wins Champions League final",
      content: "Madrid defeated Liverpool 1-0 in Paris to claim their 14th title.",
      imageUrl: "/images/real_madrid_champions.png",
      likes: 1200,
      comments: 500,
      shares: 300,
    },
    {
      id: 2,
      type: "user-post",
      authorName: "SportsFanatic",
      category: "Sports",
      content: "Game Day Vibes! Excited for the big game tonight! Who else is ready to cheer on their team? #GameNight #SportsFan",
      imageUrl: "",
      likes: 23,
      comments: 5,
      shares: 12,
    },
    {
      id: 3,
      type: "ad",
      title: "Premium Sports Gear",
      description: "Get the latest and greatest sports equipment at unbeatable prices!",
      imageUrl: "/images/ad_banner_1.png",
      ctaText: "Shop Now",
      ctaLink: "/shop",
    },
    {
      id: 4,
      type: "news",
      category: "Basketball",
      title: "Warriors secure NBA Championship",
      content: "Golden State Warriors beat Boston Celtics in a thrilling series.",
      imageUrl: "/images/warriors_champions.png",
      likes: 950,
      comments: 320,
      shares: 180,
    },
    {
      id: 5,
      type: "user-post",
      authorName: "Baller_23",
      category: "Basketball",
      content: "What a game last night! My team played lights out! #NBA #Basketball",
      imageUrl: "/images/basketball_post.png",
      likes: 55,
      comments: 15,
      shares: 8,
    },
    {
      id: 6,
      type: "ad",
      title: "Fantasy League Sign-ups Open!",
      description: "Create your dream team and compete for amazing prizes. Join now!",
      imageUrl: "/images/ad_fantasy.png",
      ctaText: "Sign Up",
      ctaLink: "/fantasy-league",
    },
  ];

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !authData) {
      router.push("/login");
    }
  }, [authData, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!authData) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="space-y-8 max-w-3xl lg:max-w-5xl mx-auto">
        {/* Header */}
        <ProfileHeader />

        {/* Active Matches */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Active Matches</h2>
            <a href="/matches" className="text-blue-600 hover:underline text-sm font-medium">
              View all
            </a>
          </div>
          <div
            className="flex space-x-4 overflow-x-auto py-4"
            style={{
              scrollbarWidth: "none",
              overscrollBehavior: "contain",
            }}
            onWheel={(e) => {
              e.preventDefault();
              const container = e.currentTarget;
              container.scrollLeft += e.deltaY;
            }}
          >
            {liveMatches.map((match, index) => (
              <LiveMatchCard
                key={index}
                sport={match.sport}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                homeScore={match.homeScore}
                awayScore={match.awayScore}
                status={match.status}
              />
            ))}
            <div className="flex-none w-24 flex items-center justify-center">
              <a href="/matches" className="flex flex-col items-center justify-center text-blue-600 hover:text-blue-700 transition-colors">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m0-6l-3 3m-3-3l3 3m0 0l-3 3" />
                </svg>
                <span className="text-sm mt-1 font-medium">More Matches</span>
              </a>
            </div>
          </div>
        </div>

        <Separator className="h-0.5 rounded-full" />
        {/* Main Feed */}
        <div>
          {/* <h2 className="text-md font-bold text-gray-900 dark:text-white mb-4">Latest Feed</h2> */}
          <div className="space-y-4">
            {feedItems.map((item) => {
              if (item.type === "news") {
                return (
                  <NewsCard
                    key={item.id}
                    type="news"
                    category={item.category || ""}
                    title={item.title || ""}
                    content={item.content || ""}
                    imageUrl={item.imageUrl || ""}
                    likes={item.likes || 0}
                    comments={item.comments || 0}
                    shares={item.shares || 0}
                  />
                );
              } else if (item.type === "user-post") {
                return (
                  <PostCard
                    key={item.id}
                    type="user-post"
                    authorAvatarUrl={""}
                    category={item.category || ""}
                    content={item.content || ""}
                    imageUrl={item.imageUrl || ""}
                    likes={item.likes || 0}
                    comments={item.comments || 0}
                    shares={item.shares || 0}
                  />
                );
              } else if (item.type === "ad") {
                return (
                  <AdCard
                    key={item.id}
                    title={item.title || ""}
                    description={item.description || ""}
                    imageUrl={item.imageUrl || ""}
                    ctaText={item.ctaText || ""}
                    ctaLink={item.ctaLink || ""}
                  />
                );
              }
              return null;
            })}
          </div>
          <div className="space-y-4">
            {feedItems.map((item) => {
              if (item.type === "news") {
                return (
                  <PostCard
                    key={item.id}
                    type="news"
                    category={item.category || ""}
                    title={item.title || ""}
                    content={item.content || ""}
                    imageUrl={item.imageUrl || ""}
                    likes={item.likes || 0}
                    comments={item.comments || 0}
                    shares={item.shares || 0}
                  />
                );
              } else if (item.type === "user-post") {
                return (
                  <PostCard
                    key={item.id}
                    type="user-post"
                    authorAvatarUrl={""}
                    category={item.category || ""}
                    content={item.content || ""}
                    imageUrl={item.imageUrl || ""}
                    likes={item.likes || 0}
                    comments={item.comments || 0}
                    shares={item.shares || 0}
                  />
                );
              } else if (item.type === "ad") {
                return (
                  <AdCard
                    key={item.id}
                    title={item.title || ""}
                    description={item.description || ""}
                    imageUrl={item.imageUrl || ""}
                    ctaText={item.ctaText || ""}
                    ctaLink={item.ctaLink || ""}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
