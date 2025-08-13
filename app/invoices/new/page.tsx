"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/forms/input-form-field";
import { FormPaper } from "@/components/ui/surfaces/FormPaper";
import { GridPaper } from "@/components/ui/surfaces/GridPaper";

// Mainnet: P2PKH (D) or P2SH (A)
const mainNetRegex = /^(D|A)[1-9A-HJ-NP-Za-km-z]{25,34}$/;

// Testnet/Regtest: P2PKH (m or n) or P2SH (2)
const testNetRegex = /^([mn2])[1-9A-HJ-NP-Za-km-z]{25,34}$/;

const NumberInput = z
  .string()
  .nonempty({ error: "Must be a number and cannot be empty." })
  .refine((value) => Number(value) >= 1, {
    error: "Must be greater than 0.",
  });

const NewInvoiceSchema = z.object({
  buyerAddress: z
    .string()
    .nonempty({ error: "Please enter a buyer address." })
    .regex(mainNetRegex, {
      error: "Please enter a valid mainnet address.",
    }),
  quantity: NumberInput,
  pricePer: NumberInput,
});

export default function CreateNewInvoice() {
  const form = useForm<z.infer<typeof NewInvoiceSchema>>({
    resolver: zodResolver(NewInvoiceSchema),
    defaultValues: {
      buyerAddress: "",
      quantity: "0",
      pricePer: "0",
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof NewInvoiceSchema>) => {
    try {
      await fetch("/api/invoice", {
        method: "POST",
        body: JSON.stringify(data),
      });

      form.reset();
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  const [quantity, pricePer] = form.watch(["quantity", "pricePer"]);
  const total = Number(quantity) * Number(pricePer);

  console.log(typeof quantity, typeof pricePer);

  return (
    <GridPaper>
      <Form {...form}>
        <FormPaper className="min-w-xl" onSubmit={form.handleSubmit(onSubmit)}>
          <InputFormField
            control={form.control}
            name="buyerAddress"
            label="Buyer Address"
            required
          />
          <InputFormField
            control={form.control}
            name="quantity"
            label="Quantity"
            inputType="number"
            required
          />
          <InputFormField
            control={form.control}
            name="pricePer"
            label="Price Per"
            inputType="number"
            required
          />
          <div className="flex flex-row items-center gap-2 justify-end tabular-nums text-sm">
            <div className="flex flex-1 border-0 rounded-sm min-w-40">
              <div className="bg-zinc-100 px-2 py-1 rounded-l-sm border-1 border-zinc-200 font-semibold text-zinc-600">
                Total
              </div>
              <div className="w-full bg-zinc-50 px-2 py-1 rounded-r-sm border-1 border-zinc-200 border-l-0 font-mono text-zinc-700">
                {total <= 0 ? "-" : total.toLocaleString()}
              </div>
            </div>
          </div>
          <Button type="submit" variant="creative" className="cursor-pointer">
            Create Invoice
          </Button>
        </FormPaper>
      </Form>
    </GridPaper>
  );
}
