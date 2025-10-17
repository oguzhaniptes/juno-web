"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

export interface UseSidebarReturn {
  isMounted: boolean;
  isExpanded: boolean;
  isSettingsOpen: boolean;
  pathname: string;
  sidebarWidthClass: string;
  toggleSidebar: () => void;
  openSettingsModal: () => void;
  closeSettingsModal: () => void;
}

const SIDEBAR_STATE_KEY = "sidebar-expanded";
const EXPANDED_WIDTH_CLASS = "w-64";
const COLLAPSED_WIDTH_CLASS = "w-16";

export const useSidebar = (): UseSidebarReturn => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const storedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    if (storedState !== null) {
      setIsExpanded(storedState === "true");
    }
    setIsMounted(true); // <-- YENİ
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsExpanded((prev) => {
      const newState = !prev;
      localStorage.setItem(SIDEBAR_STATE_KEY, String(newState));
      return newState;
    });
  }, []);

  const openSettingsModal = useCallback(() => setIsSettingsOpen(true), []);
  const closeSettingsModal = useCallback(() => setIsSettingsOpen(false), []);

  const sidebarWidthClass = isExpanded ? EXPANDED_WIDTH_CLASS : COLLAPSED_WIDTH_CLASS;

  return {
    isMounted,
    isExpanded,
    isSettingsOpen,
    pathname,
    sidebarWidthClass,
    toggleSidebar,
    openSettingsModal,
    closeSettingsModal,
  };
};
