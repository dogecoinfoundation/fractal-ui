"use client";

import { BadgeCheck } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Paper } from "@/components/ui/surfaces/Paper";
import { WalletContext } from "@/context/wallet-context";
export default function WalletView() {
  const { walletAddress } = useContext(WalletContext);

  const getPageContent = () => {
    if (walletAddress) {
      return (
        <div className="flex flex-col h-full gap-2 items-center justify-center text-2xl">
          <BadgeCheck className="size-10 text-emerald-500" />
          <p className="text-emerald-700">Wallet has been configured.</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-6 h-full justify-center items-center">
        <p className="text-2xl text-zinc-600 text-center">
          There is no wallet configured. Please import an existing wallet or
          create a new one:
        </p>
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
