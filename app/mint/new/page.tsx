"use client";

import { Header } from "@/components/header";
import { MintNewAssetForm } from "@/components/mints/new/mint-new-asset-form";
import { Separator } from "@/components/separator";

export default function MintNewAsset() {
  return (
    <>
      <Header label="Mint an Asset" />
      <Separator />
      <div className="relative overflow-y-auto flex flex-col flex-1 justify-start items-start rounded-sm p-4 border-1 border-blue-500/20 bg-linear-to-b from-blue-100/40">
        <svg
          className="absolute inset-0 pointer-events-none z-[-1] size-full fill-blue-500 stroke-blue-500 opacity-30 [mask-image:linear-gradient(to_bottom,_#ffffffad,_#ffffff20)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="grid-lines"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
              x="-1"
              y="-1"
            >
              <path d="M.5 30V.5H30" fill="none" strokeDasharray="0"></path>
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth="0"
            fill="url(#grid-lines)"
          ></rect>
        </svg>
        <MintNewAssetForm />
      </div>
    </>
  );
}
