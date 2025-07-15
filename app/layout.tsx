import type { Metadata } from "next";
import { getAllRows } from "@/app/database";
import { Header } from "@/components/header";
import { Separator } from "@/components/separator";
import { SetupWizard } from "@/components/setup/setup-wizard";
import { SideBar } from "@/components/sidebar";
import { ConfigKeys, type ConfigRow } from "./api/config/route";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fractal Admin",
  description: "Administration UI for the Fractal Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const configData = getAllRows<ConfigRow>("config");

  return (
    <html lang="en" className="h-full">
      <body className="antialiased h-full">
        <div className="flex flex-row min-h-full" role="document">
          {configData.length < ConfigKeys.length ? (
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
