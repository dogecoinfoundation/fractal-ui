"use client";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { routeMap } from "@/app/navigation";

export const Header = () => {
  const pathname = usePathname();
  const route = routeMap[pathname] || "Unknown";

  return (
    <header className="text-xl font-medium transition-colors [&_svg]:size-4 [&_svg]:shrink-0 select-none">
      {route.parent ? (
        <h1 className="flex flex-row gap-2 items-center">
          {route.parent}
          <ChevronRight className="size-4 text-zinc-500" />
          {route.label}
        </h1>
      ) : (
        <h1>{route.label}</h1>
      )}
    </header>
  );
};
