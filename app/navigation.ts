import {
  Activity,
  Coins,
  CreditCard,
  FileText,
  Fingerprint,
  List,
  type LucideIcon,
  PackagePlus,
  PiggyBank,
  Receipt,
  ScrollText,
  Settings,
} from "lucide-react";

type NavGroup = {
  name: "Assets" | "Tokens" | "Invoices" | "Manage" | "System";
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
        url: "/mints/new",
      },
      {
        label: "My Mints",
        icon: Fingerprint,
        url: "/mints/my",
      },
      {
        label: "All Known Mints",
        icon: ScrollText,
        url: "/mints/all",
      },
    ],
  },
  {
    name: "Tokens",
    items: [
      {
        label: "My Tokens",
        icon: PiggyBank,
        url: "/tokens/my",
      },
    ],
  },
  {
    name: "Invoices",
    items: [
      {
        label: "Create an Invoice",
        icon: FileText,
        url: "/invoices/new",
      },
      {
        label: "List My Invoices",
        icon: List,
        url: "/invoices/my",
      },
      {
        label: "Pay for an Invoice",
        icon: CreditCard,
        url: "/invoices/pay",
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
