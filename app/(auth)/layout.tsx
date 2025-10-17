"use client";

import Sidebar from "@/component/sidebar/SideBar";
import { ThemeProvider } from "next-themes";
import { useSidebar } from "@/hooks/use-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const sidebarControls = useSidebar();

  if (!sidebarControls.isMounted) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex bg-background">
          <div className="w-64 h-screen bg-muted" />
          <main className="flex-1 ml-64" />
        </div>
      </ThemeProvider>
    );
  }

  const mainContentMarginClass = sidebarControls.isExpanded ? "ml-64" : "ml-16";

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex bg-background text-foreground">
        <Sidebar {...sidebarControls} />
        <main className={`flex-1 overflow-auto min-h-screen transition-all duration-300 ${mainContentMarginClass}`}>
          <div className="container max-w-4xl mx-auto p-8 mt-8">{children}</div>
        </main>
      </div>
    </ThemeProvider>
  );
}
