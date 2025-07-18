import { PrismaClient } from "@/generated/prisma";
import { CONFIG_KEYS } from "@/lib/definitions";
import { SetupWizard } from "../setup/setup-wizard";

export default async function DynamicWrapper({ children }: { children: React.ReactNode }) {
  const prisma = new PrismaClient();
  const configData = await prisma.config.findMany();

  console.log('Fetched data on route render')

  if (configData && configData.length < CONFIG_KEYS.length) {
    return <SetupWizard />
  }

  return <>{children}</>;
}