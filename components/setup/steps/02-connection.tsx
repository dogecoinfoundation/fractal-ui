import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { SetupCard } from "@/components/setup/setup-card";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/forms/input-form-field";
import type { Config } from "@/generated/prisma";
import { useAPI } from "@/hooks/useAPI";
import { StepContext } from "../setup-wizard";
import { CallToAction } from "./call-to-action";
import { TestConnection } from "./test-connection";

export const ConnectionFormSchema = z.object({
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
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const form = useForm<z.infer<typeof ConnectionFormSchema>>({
    resolver: zodResolver(ConnectionFormSchema),
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

  const onSubmit = async (data: z.infer<typeof ConnectionFormSchema>) => {
    console.log({ state: form.formState });

    try {
      setLoading(true);
      setError(null);
      setSaved(false);

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

      setSaved(true);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError(e);
      setLoading(false);
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
          className="flex flex-col flex-1 justify-between w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 w-full gap-4">
            <InputFormField<typeof ConnectionFormSchema>
              control={form.control}
              name="host"
              label="Host"
              className="grid col-span-2"
            />
            <InputFormField<typeof ConnectionFormSchema>
              control={form.control}
              name="port"
              label="Port"
              inputType="number"
              className="grid col-span-1"
            />

            <InputFormField<typeof ConnectionFormSchema>
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
          </div>
          <CallToAction
            handleSave={form.handleSubmit(onSubmit)}
            saved={saved}
            error={error}
            isLastStep
          />
        </form>
      </Form>
    </SetupCard>
  );
};
