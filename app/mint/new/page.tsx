"use client";

import { Header } from "@/components/header";
import { MintNewAssetForm } from "@/components/mints/new/mint-new-asset-form";
import { Separator } from "@/components/separator";
import { GridPaper } from "@/components/ui/surfaces/GridPaper";

export default function MintNewAsset() {
  return (
    <>
      <Header label="Mint an Asset" />
      <Separator />
      <GridPaper>
        <MintNewAssetForm />
      </GridPaper>
    </>
  );
}
