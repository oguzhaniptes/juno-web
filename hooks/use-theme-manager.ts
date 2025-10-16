"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

export type Theme = "dark" | "light" | "system" | undefined;
export type ResolvedTheme = "dark" | "light";

export function useThemeManager() {
  const { theme: nextTheme, setTheme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme: Theme = nextTheme as Theme;
  const resolvedTheme: ResolvedTheme = theme === "system" ? (systemTheme as ResolvedTheme) || "light" : (theme as ResolvedTheme);
  const isDark = mounted ? resolvedTheme === "dark" : false;

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return { theme, setTheme, isDark, toggleTheme, mounted, resolvedTheme };
}
