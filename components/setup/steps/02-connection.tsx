import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { SetupCard } from "@/components/setup/setup-card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/forms/input-form-field";
import type { Config } from "@/generated/prisma";
import { useAPI } from "@/hooks/useAPI";
import { StepContext } from "../setup-wizard";
import { TestConnection } from "./test-connection";

export const FormSchema = z.object({
  host: z.string().nonempty({
    message: "Must not be empty.",
  }),
  port: z.coerce
    .number()
    .min(0, { message: "Must be between 0 and 65535." })
    .max(65535, { message: "Must be between 0 and 65535." }),
  token: z.string().nonempty({
    message: "Must not be empty.",
  }),
});

export const Connection = () => {
  const { data: configData } = useAPI<Config[]>(
    "/api/config?configKey=connection_",
  );
  const { loading, setLoading } = useContext(StepContext);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      host: "",
      port: 0,
      token: "",
    },
    values: {
      host: configData?.[0]?.value ?? "",
      port: parseInt(configData?.[1]?.value ?? "0"),
      token: configData?.[2]?.value ?? "",
    },
  });

  const [host, port, token] = form.watch(["host", "port", "token"]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log({ state: form.formState });

    try {
      setLoading(true);
      await fetch("/api/config", {
        method: "POST",
        body: JSON.stringify({
          key: "connection_host",
          value: data.host,
        }),
      });
      await fetch("/api/config", {
        method: "POST",
        body: JSON.stringify({
          key: "connection_port",
          value: data.port.toString(),
        }),
      });
      await fetch("/api/config", {
        method: "POST",
        body: JSON.stringify({
          key: "connection_token",
          value: data.token,
        }),
      });

      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SetupCard
      cardDescription="Connection"
      onComplete={() => window.location.reload()}
    >
      <h2 className="text-lg font-semibold">
        Let's connect to your Fractal Engine instance.
      </h2>
      <Form {...form}>
        <form
          className="grid grid-cols-3 w-full gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <InputFormField<typeof FormSchema>
            control={form.control}
            name="host"
            label="Host"
            className="grid col-span-2"
          />
          <InputFormField<typeof FormSchema>
            control={form.control}
            name="port"
            label="Port"
            inputType="number"
            className="grid col-span-1"
          />

          <InputFormField<typeof FormSchema>
            control={form.control}
            name="token"
            label="Token"
            className="grid col-span-3"
          />
          <TestConnection
            loading={loading}
            isValid={form.formState.isValid}
            host={host}
            port={port}
            token={token}
          />
          <Button type="submit" className="flex-1" variant="creative">
            Save
          </Button>
        </form>
      </Form>
    </SetupCard>
  );
};
