import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Separator } from "@/components/separator";
import { SetupWizard } from "@/components/setup/setup-wizard";
import { SideBar } from "@/components/sidebar";
import "./globals.css";
import { ConfigKey, PrismaClient } from "@/generated/prisma";

export const metadata: Metadata = {
  title: "Fractal Admin",
  description: "Administration UI for the Fractal Engine",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const prisma = new PrismaClient();
  const configData = await prisma.config.findMany();

  return (
    <html lang="en" className="h-full">
      <body className="antialiased h-full">
        <div className="flex flex-row min-h-full" role="document">
          {configData && configData.length < Object.values(ConfigKey).length ? (
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
