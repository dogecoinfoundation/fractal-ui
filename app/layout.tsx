import type { Metadata } from "next";
import { getDatabase } from "@/app/database";
import { Header } from "@/components/header";
import { Separator } from "@/components/separator";
import { SideBar } from "@/components/sidebar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "./globals.css";
import { SetupWizard } from "@/components/setup/setup-wizard";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Fractal Admin",
  description: "Administration UI for the Fractal Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const db = getDatabase();
  const configData = db.prepare("SELECT * FROM config").all();

  return (
    <html lang="en" className="h-full">
      <body className="antialiased h-full">
        <div className="flex flex-row min-h-full" role="document">
          {configData.length <= 0 ? (
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
