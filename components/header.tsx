"use client";

import { usePathname } from "next/navigation";
import { routeMap } from "@/app/route-map";

export const Header = () => {
  const pathname = usePathname();
  const label = routeMap[pathname] || "Unknown";

  return (
    <header className="text-xl font-medium transition-colors [&_svg]:size-4 [&_svg]:shrink-0 select-none">
      <h1>{label}</h1>
    </header>
  );
};
