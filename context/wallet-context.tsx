import { createContext } from "react";

type WalletContextType = {
  walletAddress?: string;
  refreshWalletData: () => void;
};

export const WalletContext = createContext<WalletContextType>({
  walletAddress: undefined,
  refreshWalletData: () => {},
});
