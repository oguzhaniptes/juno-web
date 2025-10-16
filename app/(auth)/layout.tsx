"use client";

import { useState } from "react";
import Sidebar from "@/component/SideBar";
import { ThemeProvider } from "next-themes";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const collapsedWidthClass = "w-16"; // corresponds to the Sidebar's collapsed width (64px)
  const expandedWidthClass = "w-64"; // corresponds to the Sidebar's expanded width (256px)

  // Use dynamic margin-left on the main content to push it away from the fixed sidebar
  const mainContentMarginClass = isExpanded ? "ml-64" : "ml-16"; // Corresponds to w-64 and w-16

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex">
        <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} collapsedWidth={collapsedWidthClass} expandedWidth={expandedWidthClass} />
        <main className={`flex-1 overflow-auto ${mainContentMarginClass}`}>
          <div className="p-6 bg-white dark:bg-black">{children}</div>
        </main>
      </div>
    </ThemeProvider>
  );
}
