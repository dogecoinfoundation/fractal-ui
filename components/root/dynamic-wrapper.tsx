// components/DynamicLayoutWrapper.tsx
import { PrismaClient } from "@/generated/prisma";
import { SetupWizard } from '../setup/setup-wizard'
import { CONFIG_KEYS } from '@/lib/definitions'
import { Header } from '../header'
import { SideBar } from '../sidebar'
import { Separator } from '../separator'

const prisma = new PrismaClient();

export default async function DynamicLayoutWrapper({
    children,
}: {
    children: React.ReactNode
}) {
    const configData = await prisma.config.findMany()
    return (
        <>
            {configData && configData.length < CONFIG_KEYS.length ? (
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
        </>
    )
}
