import { format } from "date-fns/format";
import { CalendarDays } from "lucide-react";
import type { Invoice } from "@/lib/definitions";
import { cn } from "@/lib/utils";

const InvoiceType = ({ selling }: { selling: boolean }) => {
  return (
    <div
      className={cn(
        "px-1 py-0.5 text-xs border-1 rounded-sm self-start select-none font-bold text-shadow-xs",
        selling
          ? "border-emerald-700 bg-emerald-500 text-white text-shadow-emerald-800/40"
          : "border-blue-700 bg-blue-500 text-white text-shadow-blue-800/40",
      )}
    >
      {selling ? "Selling" : "Buying"}
    </div>
  );
};

const InvoiceItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-row items-center">
      <div className="min-w-30 p-2 rounded-l-sm border-l-1 border-blue-100 bg-blue-100 text-blue-800 font-semibold">
        {label}
      </div>
      <div className="flex-1 p-2 rounded-r-sm border-r-1 border-blue-50 bg-blue-50 text-blue-900 font-mono tabular-nums">
        {value}
      </div>
    </div>
  );
};

export const InvoiceTile = ({
  invoice,
  selling,
}: {
  invoice: Invoice;
  selling: boolean;
}) => {
  return (
    <div className="flex flex-row gap-2 justify-between border-1 border-zinc-300 rounded-sm bg-white">
      <div className="flex flex-col flex-1 text-sm">
        <div className="flex flex-row flex-1 justify-between items-center gap-2 text-zinc-600 border-b-1 border-b-zinc-200 p-1.5">
          <div className="flex flex-row items-center gap-1 font-semibold">
            <CalendarDays className="size-3.5 shrink-0 text-zinc-400" />
            <p>
              {`${format(new Date(invoice.createdAt), "MMMM dd, yyyy '-' h:mm a")}`}
            </p>
          </div>
          <InvoiceType selling={selling} />
        </div>
        <div className="flex flex-col gap-2 p-2">
          <InvoiceItem
            label="Quantity"
            value={invoice.quantity.toLocaleString()}
          />
          <InvoiceItem label="Price" value={invoice.price.toLocaleString()} />
          <InvoiceItem label="Invoice Hash" value={invoice.invoiceHash} />
          <InvoiceItem label="Mint Hash" value={invoice.mintHash} />
          <InvoiceItem label="Seller Address" value={invoice.sellerAddress} />
        </div>
      </div>
    </div>
  );
};
