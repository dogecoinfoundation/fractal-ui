import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/forms/input-form-field";
import type { Mint } from "@/generated/prisma";
import { useAPI } from "@/hooks/useAPI";

export const FormSchema = z.object({
  title: z.string().nonempty({
    message: "Please provide a name of the asset you wish to mint.",
  }),
  description: z.string().nonempty({
    message: "Please provide a description of the asset you wish to mint.",
  }),
  fraction_count: z.coerce
    .number()
    .nonnegative({ message: "Please provide a positive number of tokens." })
    .min(1, {
      message: "Please ensure the number of tokens is at least 1.",
    }),
});

export const MintNewAssetForm = () => {
  const { mutate } = useAPI<Mint[]>("/api/mints");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      fraction_count: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await fetch("/api/mints", {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          fraction_count: data.fraction_count,
          metadata: {
            type: "test",
            category: "sample",
          },
          feed_url: "https://example.com",
        }),
      });
      await mutate();
      form.reset();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form {...form}>
      <form
        className="min-w-xl h-xl flex-0 bg-white border-zinc-300 border-1 rounded-sm p-4 gap-4 flex flex-col z-1 shadow-sm shadow-zinc-300/50"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <InputFormField<typeof FormSchema>
          control={form.control}
          name="title"
          label="Asset Name"
        />

        <InputFormField<typeof FormSchema>
          control={form.control}
          name="description"
          label="Asset Description"
        />

        <InputFormField<typeof FormSchema>
          control={form.control}
          name="fraction_count"
          label="Tokens"
          inputType="number"
        />

        <Button type="submit" variant="creative" className="cursor-pointer">
          Mint
        </Button>
      </form>
    </Form>
  );
};
