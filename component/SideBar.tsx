"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useThemeManager } from "@/hooks/use-theme-manager";
import { Awards, Community, Home, Debug, Profile, Notification, Settings } from "@/component/icons";

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  collapsedWidth: string;
  expandedWidth: string;
}

export default function Sidebar({ isExpanded, setIsExpanded, collapsedWidth, expandedWidth }: SidebarProps) {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: Home(),
    },
    {
      name: "Awards",
      path: "/awards",
      icon: Awards(),
    },
    {
      name: "Community",
      path: "/community",
      icon: Community(),
    },
    {
      name: "Profile",
      path: "/profile",
      icon: Profile(),
    },
    {
      name: "Debug",
      path: "/debug",
      icon: Debug(),
    },
    {
      name: "Notification",
      path: "none",
      icon: Notification(),
    },
  ];

  return (
    <div
      className={`fixed h-screen top-0 left-0 z-50 shadow border-r-2 bg-white dark:bg-black border-gray-300 dark:border-gray-800 transition-all duration-300 flex flex-col ${
        isExpanded ? expandedWidth : collapsedWidth
      }`}
    >
      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      <button onClick={() => setIsExpanded(!isExpanded)} className={`absolute top-4 z-10 p-2 rounded-lg bg-card transition-all ${isExpanded ? "right-2" : "-right-12"}`}>
        <svg
          className="w-4 h-4 text-foreground transition-transform duration-300"
          style={{ transform: isExpanded ? "rotate(0deg)" : "rotate(180deg)" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>

      {/* Logo / Brand */}
      <div className="h-16 p-4 flex items-center justify-center flex-shrink-0">
        {isExpanded ? (
          <h2 className="text-xl font-bold text-primary">Juno</h2>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-gradient-purple flex items-center justify-center glow-purple">
            <span className="text-primary font-bold text-sm">J</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
                isActive ? "bg-primary text-white glow-purple" : "text-foreground hover:bg-muted"
              } ${!isExpanded && "justify-center"}`}
              title={!isExpanded ? item.name : undefined}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {isExpanded && <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</span>}

              {/* Tooltip for collapsed state */}
              {!isExpanded && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-card border border-border text-foreground text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50 shadow-lg">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Settings at Bottom */}
      <div className="p-2 flex-shrink-0">
        <button
          className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-foreground hover:bg-muted transition-all group relative ${!isExpanded && "justify-center"}`}
          onClick={() => setIsSettingsOpen(true)}
          title={!isExpanded ? "Settings" : undefined}
        >
          <Settings />
          {isExpanded && <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">Settings</span>}

          {/* Tooltip for collapsed state */}
          {!isExpanded && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-card border border-border text-foreground text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50 shadow-lg">
              Settings
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

function SettingsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { theme, setTheme, resolvedTheme, toggleTheme, mounted } = useThemeManager();
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    if (isOpen) {
      // Modal açıldığında kaydırmayı engelle
      document.body.style.overflow = "hidden";
    } else {
      // Modal kapandığında kaydırmayı geri yükle
      document.body.style.overflow = "unset"; // veya 'auto', 'scroll'
    }

    // Bileşen unmount edildiğinde (tekrar tekrar açılıp kapanıyorsa) temizleme fonksiyonu
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <div className="relative z-10 bg-card rounded-2xl shadow-2xl w-full max-w-md p-6 border border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground gradient-text-purple">Settings</h3>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Theme */}
              <div>
                <div className="text-sm font-semibold text-foreground mb-3">Theme</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTheme("light")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      resolvedTheme === "light" ? "bg-gradient-purple text-white glow-purple" : "border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    ☀️ Light
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      resolvedTheme === "dark" ? "bg-gradient-purple text-white glow-purple" : "border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    🌙 Dark
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      theme === "system" ? "bg-gradient-purple text-white glow-purple" : "border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    💻 System
                  </button>
                </div>
                <button
                  onClick={toggleTheme}
                  className="mt-2 text-sm px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                >
                  🔄 Quick Toggle
                </button>
              </div>

              {/* Language */}
              <div>
                <div className="text-sm font-semibold text-foreground mb-3">Language</div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full border border-border rounded-lg p-3 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                >
                  <option value="en">🇬🇧 English</option>
                  <option value="tr">🇹🇷 Türkçe</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button onClick={onClose} className="px-5 py-2.5 rounded-lg border border-border text-foreground hover:bg-muted transition-all font-medium">
                Close
              </button>
              <button className="btn-gradient">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
