import {
  Activity,
  Coins,
  type LucideIcon,
  PackagePlus,
  ScrollText,
  Settings,
} from "lucide-react";

type NavGroup = {
  name: "Assets" | "Manage" | "System";
  items: NavItem[];
};

type NavItem = {
  label: string;
  icon: LucideIcon;
  url: string;
};

export const navGroups: NavGroup[] = [
  {
    name: "Assets",
    items: [
      {
        label: "Mint an Asset",
        icon: PackagePlus,
        url: "/mint/new",
      },
      {
        label: "List Minted Assets",
        icon: ScrollText,
        url: "/mint/list",
      },
    ],
  },
  {
    name: "Manage",
    items: [
      {
        label: "Add Balance",
        icon: Coins,
        url: "/balance/add",
      },
    ],
  },
  {
    name: "System",
    items: [
      {
        label: "Status",
        icon: Activity,
        url: "/status",
      },
      {
        label: "Settings",
        icon: Settings,
        url: "/settings",
      },
    ],
  },
];

export const routeMap: Record<string, string> = {
  "/": "Home",
  ...Object.fromEntries(
    navGroups
      .flatMap((group) => group.items)
      .map((item) => [item.url, item.label]),
  ),
};
