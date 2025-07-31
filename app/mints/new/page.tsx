"use client";

import { MintNewAssetForm } from "@/components/mints/new/mint-new-asset-form";
import { GridPaper } from "@/components/ui/surfaces/GridPaper";

export default function MintNewAsset() {
  return (
    <GridPaper>
      <MintNewAssetForm />
    </GridPaper>
  );
}
