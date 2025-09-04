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
import { AuthContext } from "@/context/auth-context";

const { hex, mainNet } = HASH_REGEX;

const PayInvoiceSchema = z.object({
  invoiceHash: z
    .string()
    .nonempty({ error: "Please enter an invoice hash." })
    .regex(hex, {
      error: "Please enter a valid invoice hash.",
    }),
  sellerAddress: z
    .string()
    .nonempty({ error: "Please enter a seller address." }),
  total: z.coerce.number().min(1),
});

export default function PayInvoice() {
  const { walletAddress } = useContext(WalletContext);
  const [loading, setLoading] = useState(false);
  const { password } = useContext(AuthContext);

  const form = useForm<
    z.input<typeof PayInvoiceSchema>,
    unknown,
    z.output<typeof PayInvoiceSchema>
  >({
    resolver: zodResolver(PayInvoiceSchema),
    defaultValues: {
      invoiceHash: "",
      sellerAddress: "",
      total: 0,
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof PayInvoiceSchema>) => {
    try {
      setLoading(true);
      await fetch("/api/invoice/pay", {
        method: "POST",
        body: JSON.stringify({
          invoice_hash: data.invoiceHash,
          seller_address: data.sellerAddress,
          total: data.total,
          password: password,
        }),
      });

      form.reset();
    } catch (error) {
      console.error("Error paying invoice:", error);
    } finally {
      setLoading(false);
    }
  };

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
              name="invoiceHash"
              label="Invoice Hash"
              required
              disabled={loading}
            />
            <InputFormField
              control={form.control}
              name="sellerAddress"
              label="Seller Address"
              required
              disabled={loading}
            />
            <InputFormField
              control={form.control}
              name="total"
              label="Total"
              inputType="number"
              required
              disabled={loading}
            />
            <Button type="submit" variant="creative" disabled={loading}>
              {loading ? (
                <LoaderPinwheel className="size-4 animate-spin" />
              ) : null}
              {loading ? "Paying..." : "Pay Invoice"}
            </Button>
          </FormPaper>
        </Form>
      )}
    </GridPaper>
  );
}
