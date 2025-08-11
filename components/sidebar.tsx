"use client";

import { LoaderPinwheel } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups, sidebarNavGroups } from "@/app/navigation";
import { BalanceWidget } from "@/components/balance/balance-widget";
import { StatusWidget } from "@/components/status/status-widget";
import { cn } from "@/lib/utils";
import { Separator } from "./separator";

export const SideBar = () => {
  const pathname = usePathname();
  const activeGroupName = navGroups.find((group) =>
    group.items.some((item) => item.url === pathname),
  );

  return (
    <nav className="flex flex-col justify-between gap-3 p-4 h-screen min-w-55 sticky top-0 overflow-y-auto select-none border-r-1 border-r-gray-300 bg-gray-50">
      <div className="flex flex-col">
        <Link
          href="/"
          className="flex flex-col items-center select-none rounded-md hover:text-gray-500"
        >
          <h1 className="text-md font-semibold">Fractal Administration</h1>
          <div className="flex flex-row flex-1 w-full items-center justify-between gap-2">
            <Separator className="w-full" />
            <LoaderPinwheel className="size-8 text-zinc-400" />
            <Separator className="w-full" />
          </div>
        </Link>

        <div className="flex flex-col gap-2">
          {sidebarNavGroups.map((group) => (
            <section key={group.name} className="text-sm">
              <h2
                className={cn(
                  "font-semibold text-gray-500 mb-1 transition-colors",
                  activeGroupName?.name === group.name && "text-blue-800",
                )}
              >
                {group.name}
              </h2>
              <ul className="text-md">
                {group.items.map((item) => {
                  const isActive = pathname.startsWith(item.url);
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
