import { format } from "date-fns/format";
import { CalendarDays, Clock } from "lucide-react";
import { InvoiceItem } from "@/components/invoice/invoice-item";
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

export const InvoiceTile = ({
  invoice,
  selling,
}: {
  invoice: Invoice;
  selling: boolean;
}) => {
  return (
    <div className="flex flex-row gap-2 justify-between border-1 border-zinc-300 rounded-sm bg-white">
      <div className="flex flex-col flex-1 text-xs">
        <div className="flex flex-row flex-1 justify-between items-center gap-2 text-zinc-600 border-b-1 border-b-zinc-200 p-1.5">
          <div className="flex flex-row gap-4 font-semibold">
            <div className="flex flex-row items-center gap-1">
              <CalendarDays className="size-3.5 shrink-0 text-zinc-400" />
              <p>{`${format(new Date(invoice.createdAt), "MMMM dd, yyyy")}`}</p>
            </div>

            <div className="flex flex-row items-center gap-1">
              <Clock className="size-3.5 shrink-0 text-zinc-400" />
              <p>{`${format(new Date(invoice.createdAt), "h:mm a")}`}</p>
            </div>
          </div>
          <InvoiceType selling={selling} />
        </div>
        <div className="flex flex-col gap-2 p-2">
          <div className="flex flex-row gap-2 justify-between">
            <InvoiceItem
              label="Quantity"
              value={invoice.quantity.toLocaleString()}
              variant="green"
            />
            <InvoiceItem
              label="Price"
              value={invoice.price.toLocaleString()}
              variant="green"
            />
          </div>

          <div className="flex flex-col xl:flex-row gap-2 justify-between">
            <InvoiceItem
              label="Invoice Hash"
              value={invoice.invoiceHash}
              variant="blue"
            />
            <InvoiceItem
              label="Mint Hash"
              value={invoice.mintHash}
              variant="blue"
            />
          </div>
          {!selling ? (
            <InvoiceItem
              label="Seller Address"
              value={invoice.sellerAddress}
              variant="amber"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
