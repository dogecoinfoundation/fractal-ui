import { WalletContent } from "@/components/balance/wallet-content";
import { useAPI } from "@/hooks/useAPI";
import { BalanceContent } from "./balance-content";

export const BalanceWidget = () => {
  const {
    data: walletData,
    isLoading: isWalletLoading,
    error: walletError,
  } = useAPI<{ walletExists: boolean }>("/api/wallet");

  if (!walletData?.walletExists) {
    return <WalletContent isLoading={isWalletLoading} error={walletError} />;
  }

  return <BalanceContent />;
};
