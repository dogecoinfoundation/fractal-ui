import "./globals.css";
import type { Metadata } from "next";
import { Main } from "@/components/main";
import { SetupWizard } from "@/components/setup/wizard/setup-wizard";
import { PrismaClient } from "@/generated/prisma";
import { validateConfigRows } from "@/lib/validation";

export const metadata: Metadata = {
  title: "Fractal Administration",
  description: "Administration UI for the Fractal Engine",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const prisma = new PrismaClient();
  const configData = await prisma.config.findMany();
  const configDataIsValid = validateConfigRows(configData);

  return (
    <html lang="en" className="h-full">
      <body className="antialiased h-full">
        <div className="flex flex-row min-h-full" role="document">
          {!configDataIsValid ? <SetupWizard /> : <Main>{children}</Main>}
        </div>
      </body>
    </html>
  );
}
