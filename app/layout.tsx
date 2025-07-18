"use client"

import { CONFIG_KEYS } from "@/lib/definitions";
import "./globals.css";
import { SetupWizard } from "@/components/setup/setup-wizard";
import { SideBar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Separator } from "@/components/separator";
import { useAPI } from "@/hooks/useAPI";
import { Config } from "@/generated/prisma";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, isLoading, error } = useAPI<Config[]>("/api/config");

  return (
    <html lang="en" className="h-full">
      <body className="antialiased h-full">
        <div className="flex flex-row min-h-full" role="document">
          {data && data.length < CONFIG_KEYS.length ? (
            <SetupWizard />
          ) : (
            <>
              <SideBar />
              <main className="flex flex-col flex-1">
                <div className="flex flex-col h-screen gap-3 p-4">
                  <Header />
                  <Separator />
                  {children}
                </div>
              </main>
            </>
          )}
        </div>
      </body>
    </html>
  );
}
