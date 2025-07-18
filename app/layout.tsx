import "./globals.css";

import { Header } from "@/components/header";
import DynamicLayoutWrapper from "@/components/root/dynamic-wrapper";
import { Separator } from "@/components/separator";
import { SetupWizard } from "@/components/setup/setup-wizard";
import { SideBar } from "@/components/sidebar";
import { PrismaClient } from "@/generated/prisma";
import { CONFIG_KEYS } from "@/lib/definitions";


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
          <DynamicLayoutWrapper>
            {children}
          </DynamicLayoutWrapper>
        </div>
      </body>
    </html>
  );
}
