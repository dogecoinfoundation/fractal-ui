"use client";

import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { routeMap } from "@/app/navigation";

export const Header = () => {
  const pathname = usePathname();
  const route = routeMap[pathname] || "Unknown";

  return (
    <header className="text-xl font-medium select-none leading-snug">
      <h1 className="flex flex-row gap-2 items-center">
        {route.parent ? (
          <>
            <route.icon className="size-5 text-zinc-400" />
            <span>{route.parent}</span>
            <ArrowRight className="size-3 text-zinc-500" />
            <span>{route.label}</span>
          </>
        ) : (
          <>
            <route.icon className="size-5 text-zinc-400" /> {route.label}
          </>
        )}
      </h1>
    </header>
  );
};
