"use client";

import { useState } from "react";
import Sidebar from "@/component/SideBar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const collapsedWidthClass = "w-16"; // corresponds to the Sidebar's collapsed width (64px)
  const expandedWidthClass = "w-64"; // corresponds to the Sidebar's expanded width (256px)

  // Use dynamic margin-left on the main content to push it away from the fixed sidebar
  const mainContentMarginClass = isExpanded ? "ml-64" : "ml-16"; // Corresponds to w-64 and w-16

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} collapsedWidth={collapsedWidthClass} expandedWidth={expandedWidthClass} />
      <main className={`flex-1 overflow-auto ${mainContentMarginClass}`}>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
