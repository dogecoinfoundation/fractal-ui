import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/forms/input-form-field";
import { FormPaper } from "@/components/ui/surfaces/FormPaper";
import { Mint } from "@/app/api/mints/route";
import { useAPI } from "@/hooks/useAPI";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

export const FormSchema = z.object({
  title: z.string().nonempty({
    error: "Please provide a name of the asset you wish to mint.",
  }),
  description: z.string().nonempty({
    error: "Please provide a description of the asset you wish to mint.",
  }),
  fraction_count: z.coerce.number().min(1),
});

export const MintNewAssetForm = () => {
  const { mutate } = useAPI<Mint[]>("/api/mints");
  const { password } = useContext(AuthContext);

  const form = useForm<
    z.input<typeof FormSchema>,
    unknown,
    z.output<typeof FormSchema>
  >({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      fraction_count: 0,
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await fetch("/api/mints", {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          fraction_count: data.fraction_count,
          password: password,
          tags: null,
          metadata: null,
          requirements: null,
          lockup_options: null,
          feed_url: null,
          contract_of_sale: null,
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
      <FormPaper className="min-w-xl" onSubmit={form.handleSubmit(onSubmit)}>
        <InputFormField
          control={form.control}
          name="title"
          label="Asset Name"
          required
        />

        <InputFormField
          control={form.control}
          name="description"
          label="Asset Description"
          required
        />

        <InputFormField
          control={form.control}
          name="fraction_count"
          label="Tokens"
          inputType="number"
          required
        />

        <Button type="submit" variant="creative" className="cursor-pointer">
          Mint
        </Button>
      </FormPaper>
    </Form>
  );
};
