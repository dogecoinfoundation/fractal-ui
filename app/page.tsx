"use client";

import { RedirectType, redirect, usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();

  if (pathname === "/") redirect("/mint/list", RedirectType.replace);

  return null;
}
