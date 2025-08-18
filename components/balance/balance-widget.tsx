import { useContext } from "react";
import { WalletContent } from "@/components/balance/wallet-content";
import { WalletContext } from "@/context/wallet-context";
import { BalanceContent } from "./balance-content";

export const BalanceWidget = () => {
  const { walletAddress } = useContext(WalletContext);

  if (!walletAddress) return <WalletContent />;

  return <BalanceContent />;
};
