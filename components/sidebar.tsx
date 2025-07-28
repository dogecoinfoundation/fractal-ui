"use client";

import {
  Activity,
  Coins,
  type LucideIcon,
  PackagePlus,
  ScrollText,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BalanceWidget } from "@/components/balance/balance-widget";
import { StatusWidget } from "@/components/status/status-widget";
import { cn } from "@/lib/utils";
import metadata from "@/package.json";

type NavGroup = {
  name: string;
  items: NavItem[];
};

type NavItem = {
  label: string;
  icon: LucideIcon;
  url: string;
};

const navGroups: NavGroup[] = [
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

export const SideBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col justify-between gap-2 h-screen min-w-55 sticky top-0 overflow-y-auto select-none border-r-1 border-r-gray-300 bg-gray-50 p-3">
      <div>
        <Link
          href="/"
          className="flex flex-col items-center mb-3 select-none rounded-md hover:text-gray-500"
        >
          <h1 className="text-md font-semibold">Fractal Administration</h1>
          <h2 className="font-mono text-xs font-normal border-1 border-blue-600/25 bg-blue-200 text-blue-700 px-1 py-0.25 rounded-sm">
            {metadata.version}
          </h2>
        </Link>

        <div className="flex flex-col gap-2">
          {navGroups.map((group) => (
            <section key={group.name} className="text-sm">
              <h2 className="font-semibold text-gray-500 mb-1">{group.name}</h2>
              <ul className="text-md">
                {group.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <li key={item.label} className="group/menu-item relative">
                      <Link
                        href={item.url}
                        className={cn(
                          "flex items-center gap-2 p-1 px-2 rounded-md [&>svg]:size-4 [&>svg]:shrink-0 h-8 font-normal transition-colors duration-200",
                          isActive
                            ? "bg-blue-100 text-blue-700 [&>svg]:text-blue-600"
                            : "hover:bg-gray-100 [&>svg]:text-gray-600",
                        )}
                      >
                        <item.icon /> {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <BalanceWidget />
        <StatusWidget />
      </div>
    </nav>
  );
};
