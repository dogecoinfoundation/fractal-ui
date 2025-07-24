import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { SetupContext } from "@/components/setup/setup-context";
import { CallToAction } from "@/components/setup/wizard/steps/call-to-action";
import { TestConnection } from "@/components/setup/wizard/steps/test-connection";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/forms/input-form-field";
import type { Config } from "@/generated/prisma";
import { useAPI } from "@/hooks/useAPI";

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
  const { data: configData, mutate } = useAPI<Config[]>(
    "/api/config?configKey=connection_",
  );
  const { loading, setLoading, refreshConfigData } = useContext(SetupContext);
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
    try {
      setLoading(true);
      setError(null);
      setSaved(false);

      await fetch("/api/config", {
        method: "POST",
        body: JSON.stringify([
          { key: "connection_host", value: data.host },
          { key: "connection_port", value: data.port.toString() },
          { key: "connection_token", value: data.token },
        ]),
      });

      await mutate();
      setSaved(true);
      setLoading(false);
      refreshConfigData();
    } catch (e) {
      console.error(e);
      setError(e);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full w-full flex-1">
      <Form {...form}>
        <form
          className="flex flex-col flex-1 justify-between w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">
              Let's connect to your Fractal Engine instance.
            </h2>
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
                inputType="password"
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
          </div>

          <CallToAction
            handleSave={form.handleSubmit(onSubmit)}
            saved={saved}
            error={error}
            isDirty={form.formState.isDirty}
            isEmpty={!host && !port && !token}
            isLastStep
          />
        </form>
      </Form>
    </div>
  );
};
