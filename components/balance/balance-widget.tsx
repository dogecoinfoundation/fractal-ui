import { useContext } from "react";
import { WalletContent } from "@/components/balance/wallet-content";
import { WalletContext } from "@/context/wallet-context";
import { BalanceContent } from "./balance-content";

export const BalanceWidget = () => {
  const { wallet } = useContext(WalletContext);

  if (!wallet?.name) return <WalletContent />;

  return <BalanceContent />;
};
