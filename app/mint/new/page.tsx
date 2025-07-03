"use client";

import { Header } from "@/components/header";
import { MintNewAssetForm } from "@/components/mints/new/mint-new-asset-form";
import { Separator } from "@/components/separator";

export default function MintNewAsset() {
  return (
    <>
      <Header label="Mint an Asset" />
      <Separator />
      <div className="overflow-y-auto flex flex-col flex-1 justify-start items-start bg-gray-100 border-1 border-gray-300 rounded-sm p-4">
        <MintNewAssetForm />
      </div>
    </>
  );
}
