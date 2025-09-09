import { Wallet } from "@/generated/prisma";
import { createContext } from "react";

type WalletContextType = {
  wallet?: Wallet;
  refreshWalletData: () => void;
};

export const WalletContext = createContext<WalletContextType>({
  wallet: undefined,
  refreshWalletData: () => {},
});
