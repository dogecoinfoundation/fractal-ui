"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/forms/input-form-field";
import { Input } from "@/components/ui/input";
import { FormPaper } from "@/components/ui/surfaces/FormPaper";
import { GridPaper } from "@/components/ui/surfaces/GridPaper";
import { NumberSchema } from "@/lib/form-validation";
import { hexRegex, mainNetRegex } from "@/lib/hash-validation";

const NumberInput = NumberSchema(1);

const PayInvoiceSchema = z.object({
  hash: z
    .string()
    .nonempty({ error: "Please enter an invoice hash." })
    .regex(hexRegex, {
      error: "Please enter a valid invoice hash.",
    }),
  sellerAddress: z
    .string()
    .nonempty({ error: "Please enter a seller address." })
    .regex(mainNetRegex, {
      error: "Please enter a valid mainnet address.",
    }),
  total: NumberInput,
});

export default function PayInvoice() {
  const form = useForm<z.infer<typeof PayInvoiceSchema>>({
    resolver: zodResolver(PayInvoiceSchema),
    defaultValues: {
      hash: "",
      sellerAddress: "",
      total: "0",
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof PayInvoiceSchema>) => {
    try {
      await fetch("/api/invoice/pay", {
        method: "POST",
        body: JSON.stringify(data),
      });

      form.reset();
    } catch (error) {
      console.error("Error paying invoice:", error);
    }
  };

  return (
    <GridPaper>
      <Form {...form}>
        <FormPaper className="min-w-xl" onSubmit={form.handleSubmit(onSubmit)}>
          <InputFormField
            control={form.control}
            name="hash"
            label="Invoice Hash"
            required
          />
          <InputFormField
            control={form.control}
            name="sellerAddress"
            label="Seller Address"
            required
          />
          <InputFormField
            control={form.control}
            name="total"
            label="Total"
            inputType="number"
            required
          />
          <Input type="hidden" itemType="number" />
          <Button type="submit" variant="creative">
            Pay Invoice
          </Button>
        </FormPaper>
      </Form>
    </GridPaper>
  );
}
