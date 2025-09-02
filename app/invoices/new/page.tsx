"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderPinwheel } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/forms/input-form-field";
import { FormPaper } from "@/components/ui/surfaces/FormPaper";
import { GridPaper } from "@/components/ui/surfaces/GridPaper";
import { WalletNotConfiguredAlert } from "@/components/wallet/wallet-not-configured-alert";
import { WalletContext } from "@/context/wallet-context";
import { HASH_REGEX } from "@/lib/hash-validation";

const NewInvoiceSchema = z.object({
  buyerAddress: z
    .string()
    .nonempty({ error: "Please enter a buyer address." })
    .regex(HASH_REGEX.mainNet, {
      error: "Please enter a valid mainnet address.",
    }),
  quantity: z.coerce.number().min(1),
  pricePer: z.coerce.number().min(1),
});

export default function CreateNewInvoice() {
  const { walletAddress } = useContext(WalletContext);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(NewInvoiceSchema),
    defaultValues: {
      buyerAddress: "",
      quantity: 0,
      pricePer: 0,
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof NewInvoiceSchema>) => {
    try {
      setLoading(true);
      await fetch("/api/invoice/create", {
        method: "POST",
        body: JSON.stringify(data),
      });
      form.reset();
    } catch (error) {
      console.error("Error creating invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  const [quantity, pricePer] = form.watch(["quantity", "pricePer"]);
  const total = Number(quantity) * Number(pricePer);

  return (
    <GridPaper>
      {!walletAddress ? (
        <WalletNotConfiguredAlert />
      ) : (
        <Form {...form}>
          <FormPaper
            className="min-w-xl"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <InputFormField
              control={form.control}
              name="buyerAddress"
              label="Buyer Address"
              required
              disabled={loading}
            />
            <InputFormField
              control={form.control}
              name="quantity"
              label="Quantity"
              inputType="number"
              required
              disabled={loading}
            />
            <InputFormField
              control={form.control}
              name="pricePer"
              label="Price Per"
              inputType="number"
              required
              disabled={loading}
            />
            <div className="flex flex-row items-center gap-2 justify-end tabular-nums text-sm">
              <div className="flex flex-1 border-0 rounded-sm min-w-40">
                <div className="bg-zinc-100 px-2 py-1 rounded-l-sm border-1 border-zinc-200 font-semibold text-zinc-600 select-none">
                  Total
                </div>
                <div className="w-full bg-zinc-50 px-2 py-1 rounded-r-sm border-1 border-zinc-200 border-l-0 font-mono text-zinc-700">
                  {total <= 0 ? "-" : total.toLocaleString()}
                </div>
              </div>
            </div>
            <Button type="submit" variant="creative" disabled={loading}>
              {loading ? (
                <LoaderPinwheel className="size-4 animate-spin" />
              ) : null}
              {loading ? "Creating..." : "Create Invoice"}
            </Button>
          </FormPaper>
        </Form>
      )}
    </GridPaper>
  );
}
