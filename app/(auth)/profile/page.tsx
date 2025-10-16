"use client";

import { useSession } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { authData, isLoading } = useSession();
  const router = useRouter();

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
              <p className="text-gray-600 mt-1">Your account overview</p>
            </div>
          </div>
        </div>

        {/* Profile content */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/basketball_post.png" alt="Profile avatar" className="h-32 w-32 rounded-full object-cover ring-4 ring-gray-200" />

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">Ethan Carter</div>
                  <div className="text-sm text-blue-600">@ethan.carter</div>
                  <div className="text-xs text-gray-500">Joined 2021</div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 max-w-md">
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">1200</div>
                  <div className="text-xs text-gray-500">Score</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">500</div>
                  <div className="text-xs text-gray-500">Gold</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">200</div>
                  <div className="text-xs text-gray-500">Diamonds</div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Rows */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-100 rounded-lg p-4">
              <div className="text-xs text-gray-500">Favorite Team</div>
              <div className="text-sm font-medium text-gray-900 mt-1">Los Angeles Lakers</div>
            </div>
            <div className="border border-gray-100 rounded-lg p-4">
              <div className="text-xs text-gray-500">Favorite Sport</div>
              <div className="text-sm font-medium text-gray-900 mt-1">Basketball</div>
            </div>
            <button className="border border-gray-100 rounded-lg p-4 text-left flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Owned Items</div>
                <div className="text-sm font-medium text-gray-900 mt-1">View your collectibles</div>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button className="border border-gray-100 rounded-lg p-4 text-left flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Wallet Address</div>
                <div className="text-sm font-medium text-gray-900 mt-1">Manage wallet</div>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
