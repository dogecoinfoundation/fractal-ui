"use client";

import { Wallet } from "@/generated/prisma";
import { WalletItem } from "./wallet-item";
import { Button } from "../ui/button";
import { WalletContext } from "@/context/wallet-context";
import { useContext } from "react";

export const WalletTile = ({
  wallet,
  mutate,
}: {
  wallet: Wallet;
  mutate: () => void;
}) => {
  const { refreshWalletData } = useContext(WalletContext);

  const activateWallet = async (name: string) => {
    await fetch("/api/wallet", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    mutate();
    refreshWalletData();
  };

  return (
    <div className="flex flex-row gap-2 justify-between border-1 border-zinc-300 rounded-sm bg-white">
      <div className="flex flex-col flex-1 text-xs">
        <div className="flex flex-row flex-1 justify-between items-center gap-2 text-zinc-600 border-b-1 border-b-zinc-200 p-1.5">
          <div className="flex flex-col xl:flex-row gap-2 justify-between">
            <WalletItem
              extraClasses="min-w-80"
              label="Name"
              value={wallet.name}
              variant="blue"
            />
            <WalletItem
              label="Address"
              value={wallet.address}
              variant="green"
            />
            {wallet.active && (
              <WalletItem label="Active" value={""} variant="amber" />
            )}

            <div className="flex-1">
              <Button
                type="button"
                onClick={async () => await activateWallet(wallet.name)}
                variant="creative"
                className="cursor-pointer"
              >
                Activate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
