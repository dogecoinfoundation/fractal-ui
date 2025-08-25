"use client";

import { Loader2, LoaderPinwheel } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import QRCode from "qrcode";
import { useContext, useEffect, useState } from "react";
import { GridPaper } from "@/components/ui/surfaces/GridPaper";
import { Paper } from "@/components/ui/surfaces/Paper";
import { WalletContext } from "@/context/wallet-context";

export default function AddBalance() {
  const { walletAddress } = useContext(WalletContext);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);

  if (!walletAddress) redirect("/wallet");

  useEffect(() => {
    if (!walletAddress) return;

    setLoading(true);
    QRCode.toDataURL(`dogecoin:${String(walletAddress)}`)
      .then((url) => {
        setQrCode(url);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [walletAddress]);

  return (
    <GridPaper>
      {loading ? (
        <LoaderPinwheel className="animate-spin" />
      ) : (
        <div className="flex flex-col self-stretch gap-4 z-10 p-2">
          <div className="flex flex-col gap-2 self-center items-center w-fit border-1 border-zinc-200 rounded-sm bg-white px-3 py-2">
            <h2>
              Scan the QR code below with your phone to use your preferred app
              to add balance to this wallet.
            </h2>
          </div>
          <div className="px-3 py-2 w-fit self-center border-1 rounded-sm border-amber-900/40 bg-amber-50 text-amber-900/85 font-mono text-center ">
            {walletAddress}
          </div>

          <div className="flex flex-col items-center justify-center">
            {qrCode ? (
              <Image
                src={qrCode ?? ""}
                alt="QR Code"
                width={256}
                height={256}
                className="border-1 border-zinc-200 rounded-sm shadow-sm"
              />
            ) : null}
          </div>
        </div>
      )}
    </GridPaper>
  );
}
