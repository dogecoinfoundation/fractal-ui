"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useContext, useState } from "react";
import { InvoiceTile } from "@/components/invoice/invoice-tile";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Paper } from "@/components/ui/surfaces/Paper";
import { Switch } from "@/components/ui/switch";
import { WalletNotConfiguredAlert } from "@/components/wallet/wallet-not-configured-alert";
import { WalletContext } from "@/context/wallet-context";
import { useAPI } from "@/hooks/useAPI";
import type { Invoice } from "@/lib/definitions";
import { cn } from "@/lib/utils";

type SwitchTileProps = {
  id: string;
  label: string;
  checked: boolean;
  toggleChecked: (checked: boolean) => void;
  disabled?: boolean;
};

const SwitchTile = ({
  id,
  label,
  checked,
  toggleChecked,
  disabled,
}: SwitchTileProps) => (
  <div
    className={cn(
      "flex items-center gap-2 border-1 border-zinc-200 rounded-md bg-white p-2 transition-colors",
      checked
        ? "border-blue-500 bg-blue-100 text-blue-700"
        : "bg-white text-zinc-500",
    )}
  >
    <Label htmlFor={id}>{label}</Label>
    <Switch
      id={id}
      checked={checked}
      onCheckedChange={toggleChecked}
      disabled={disabled}
      className="cursor-pointer"
    />
  </div>
);

export default function MyInvoices() {
  const { walletAddress } = useContext(WalletContext);
  const [sortDescending, setSortDescending] = useState(true);
  const [showBuying, setShowBuying] = useState(true);
  const [showSelling, setShowSelling] = useState(true);
  const { data, isLoading, error } = useAPI<Invoice[]>("/api/invoice/my");

  const filteredInvoices = data
    ?.filter((invoice) => {
      const selling = walletAddress && invoice.sellerAddress === walletAddress;

      if (showBuying && !selling) return true;
      if (showSelling && selling) return true;

      return false;
    })
    .sort((a, b) =>
      sortDescending
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

  return (
    <Paper className="h-full flex-1 p-0 gap-0 bg-white">
      {isLoading ? <Skeleton className="h-10 w-full" /> : null}
      {error ? (
        <Alert variant="error">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      {!walletAddress ? (
        <WalletNotConfiguredAlert />
      ) : (
        <div className="flex flex-col overflow-hidden h-full">
          <div className="flex flex-row gap-2 p-2 border-b-1 border-zinc-200 bg-zinc-50">
            <Button
              size="icon"
              onClick={() => setSortDescending(!sortDescending)}
            >
              {sortDescending ? <ArrowDown /> : <ArrowUp />}
            </Button>
            <SwitchTile
              id="show-buying"
              label="Show Buying"
              checked={showBuying}
              toggleChecked={setShowBuying}
            />
            <SwitchTile
              id="show-selling"
              label="Show Selling"
              checked={showSelling}
              toggleChecked={setShowSelling}
            />
          </div>
          <div className="flex flex-col h-full gap-2 p-2 overflow-auto bg-zinc-100">
            {filteredInvoices?.length === 0 ? (
              <div className="flex flex-col gap-2 items-center justify-center h-full">
                <p className="text-zinc-600">No invoices found.</p>
              </div>
            ) : null}
            {filteredInvoices?.map((invoice) => (
              <InvoiceTile
                key={invoice.id}
                invoice={invoice}
                selling={invoice.sellerAddress === walletAddress}
              />
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
}
