import { Awards, Community, Home, Debug, Profile, Notification } from "@/component/icons";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  notificationCount?: number;
}

export const MENU_ITEMS: MenuItem[] = [
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
    name: "Notification",
    path: "/notifications",
    icon: Notification(),
  },
  {
    name: "Debug",
    path: "/debug",
    icon: Debug(),
  },
];
