"use client";

import { useSession } from "@/provider/AuthProvider";
import { AuthProvider } from "@/types/auth";
import { useState } from "react";

export default function LoginPage() {
  const { signIn, isLoading } = useSession();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async (provider: AuthProvider) => {
    try {
      await signIn(provider);
      // Middleware will handle redirect after successful login
    } catch (error) {
      console.error("Login failed:", error);
      // TODO: Show error message to user (toast, alert, etc.)
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-lg text-gray-700 dark:text-gray-300">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-2">
          Sign In With
        </h1>
        <p className="text-base text-center text-gray-500 dark:text-gray-400 mb-8">
          Your Preferred Service
        </p>

        {/* Provider Buttons Grid */}
        <div className="flex justify-around gap-3 mb-6">
          {/* Google */}
          <button
            onClick={() => handleLogin(AuthProvider.GOOGLE)}
            disabled={isLoading}
            className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </button>

          {/* Twitch - Disabled */}
          <button
            disabled
            className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center shadow-sm opacity-50 cursor-not-allowed"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#9146FF">
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
            </svg>
          </button>

          {/* Facebook - Disabled */}
          <button
            disabled
            className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center shadow-sm opacity-50 cursor-not-allowed"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>

          {/* Microsoft */}
          <button
            onClick={() => handleLogin(AuthProvider.MICROSOFT)}
            disabled={isLoading}
            className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-7 h-7 grid grid-cols-2 gap-0.5">
              <div className="w-3 h-3 bg-[#F25022]"></div>
              <div className="w-3 h-3 bg-[#7FBA00]"></div>
              <div className="w-3 h-3 bg-[#00A4EF]"></div>
              <div className="w-3 h-3 bg-[#FFB900]"></div>
            </div>
          </button>
        </div>

        {/* More Options Button */}
        <button
          onClick={() => setModalVisible(true)}
          className="w-full py-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          More Options
        </button>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setModalVisible(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl">
            {/* Modal Title */}
            <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-6">
              More Sign In Options
            </h2>

            {/* Modal Providers */}
            <div className="space-y-3 mb-5">
              {/* Apple - Disabled */}
              <button
                disabled
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span className="text-base font-medium text-gray-900 dark:text-white">
                  Sign in with Apple
                </span>
              </button>

              {/* Discord - Disabled */}
              <button
                disabled
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#5865F2">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                <span className="text-base font-medium text-gray-900 dark:text-white">
                  Sign in with Discord
                </span>
              </button>
            </div>

            {/* Cancel Button */}
            <button
              onClick={() => setModalVisible(false)}
              className="w-full py-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
