"use client";

import { type ReactNode, useState } from "react";
import { Header } from "@/components/header";
import { PasswordDialog } from "@/components/password/password-dialog";
import { Separator } from "@/components/separator";
import { SideBar } from "@/components/sidebar";
import { AuthContext } from "@/context/auth-context";
import { WalletContext } from "@/context/wallet-context";
import type { Wallet } from "@/generated/prisma";
import { useAPI } from "@/hooks/useAPI";

export const Main = ({ children }: { children: ReactNode }) => {
  const [password, setPassword] = useState<string | undefined>(undefined);
  const { data, mutate: refreshWalletData } = useAPI<Wallet>("/api/wallet");
  const walletAddress = data?.address;

  return (
    <AuthContext value={{ password, setPassword }}>
      {password ? (
        <WalletContext value={{ walletAddress, refreshWalletData }}>
          <SideBar />
          <main className="flex flex-col flex-1">
            <div className="flex flex-col h-screen gap-3 p-4">
              <Header />
              <Separator />
              {children}
            </div>
          </main>
        </WalletContext>
      ) : (
        <PasswordDialog />
      )}
    </AuthContext>
  );
};
