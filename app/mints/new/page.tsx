"use client";

import { useContext } from "react";
import { MintNewAssetForm } from "@/components/mints/new/mint-new-asset-form";
import { GridPaper } from "@/components/ui/surfaces/GridPaper";
import { WalletNotConfiguredAlert } from "@/components/wallet/wallet-not-configured-alert";
import { WalletContext } from "@/context/wallet-context";

export default function MintNewAsset() {
  const { wallet } = useContext(WalletContext);

  return (
    <GridPaper>
      {!wallet ? <WalletNotConfiguredAlert /> : <MintNewAssetForm />}
    </GridPaper>
  );
}
