"use client";

import { BadgeCheck } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Paper } from "@/components/ui/surfaces/Paper";
import { WalletContext } from "@/context/wallet-context";
import { useAPI } from "@/hooks/useAPI";
import { Wallet } from "@/generated/prisma";
import { WalletTile } from "@/components/wallet/wallet-tile";
export default function WalletView() {
  const { data, error, isLoading, mutate } =
    useAPI<Wallet[]>("/api/wallet/all");
  const { wallet } = useContext(WalletContext);

  const getPageContent = () => {
    return (
      <div className="flex flex-col gap-6 h-full justify-center items-center">
        {(data?.length || 0) > 1 && (
          <div>
            {data?.map((wallet) => (
              <WalletTile key={wallet.name} wallet={wallet} mutate={mutate} />
            ))}
          </div>
        )}

        {data?.length === 0 && (
          <p className="text-2xl text-zinc-600 text-center">
            There is no wallet configured. Please import an existing wallet or
            create a new one:
          </p>
        )}
        {wallet?.name && (
          <p className="text-2xl text-zinc-600 text-center">
            You already have a wallet configured ({wallet.name}). You can still
            import an existing wallet or create a new one:
          </p>
        )}
        <div className="flex flex-row gap-6 self-center justify-between w-1/2">
          <Link href="/wallet/import" className="flex-1">
            <Button className="w-full text-xl p-8">Import</Button>
          </Link>
          <Link href="/wallet/create" className="flex-1">
            <Button variant="creative" className="w-full text-xl p-8">
              Create
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  return <Paper>{getPageContent()}</Paper>;
}
