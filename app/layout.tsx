import type { Metadata } from "next";
import "./globals.css";
import { SideBar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Fractal Admin",
  description: "Administration UI for the Fractal Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased h-full">
        <div className="flex flex-row min-h-full" role="document">
          <SideBar />
          <main className="flex flex-col flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
