import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { CallToAction } from "@/components/setup/wizard/steps/call-to-action";
import { TestConnection } from "@/components/setup/wizard/steps/test-connection";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/forms/input-form-field";
import { ConfigContext } from "@/context/config-context";

const MINIMUM_PORT = 0;
const MAXIMUM_PORT = 65535;
const PORT_VALIDATION_MESSAGE = `Must be a number between ${MINIMUM_PORT} and ${MAXIMUM_PORT}.`;

export const ConnectionFormSchema = z.object({
  host: z.string().nonempty({
    message: "Must not be empty.",
  }),
  port: z.coerce
    .number()
    .min(MINIMUM_PORT, {
      message: PORT_VALIDATION_MESSAGE,
    })
    .max(MAXIMUM_PORT, {
      message: PORT_VALIDATION_MESSAGE,
    }),
  token: z.string().nonempty({
    message: "Must not be empty.",
  }),
});

export const ConnectionForm = () => {
  const {
    configData,
    loading: configLoading,
    setLoading,
    getConfigRowByKey,
    refreshConfigData,
    error,
  } = useContext(ConfigContext);
  const [saved, setSaved] = useState(false);

  const configRows = {
    host: getConfigRowByKey(configData, "connection_host"),
    port: getConfigRowByKey(configData, "connection_port"),
    token: getConfigRowByKey(configData, "connection_token"),
  };

  const form = useForm<z.infer<typeof ConnectionFormSchema>>({
    resolver: zodResolver(ConnectionFormSchema),
    defaultValues: {
      host: "",
      port: 0,
      token: "",
    },
    values: {
      host: configRows.host?.value ?? "",
      port: parseInt(configRows.port?.value ?? "0"),
      token: configRows.token?.value ?? "",
    },
  });

  const [host, port, token] = form.watch(["host", "port", "token"]);

  const onSubmit = async (data: z.infer<typeof ConnectionFormSchema>) => {
    try {
      setLoading(true);
      setSaved(false);

      await fetch("/api/config", {
        method: "POST",
        body: JSON.stringify([
          { key: "connection_host", value: data.host },
          { key: "connection_port", value: data.port.toString() },
          { key: "connection_token", value: data.token },
        ]),
      });

      setSaved(true);
      await refreshConfigData();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <Form {...form}>
        <form
          className="flex flex-col flex-1 justify-start gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-12 w-full gap-4">
              <InputFormField<typeof ConnectionFormSchema>
                control={form.control}
                name="host"
                label="Host"
                className="grid col-span-7"
              />
              <InputFormField<typeof ConnectionFormSchema>
                control={form.control}
                name="port"
                label="Port"
                inputType="number"
                className="grid col-span-5"
              />

              <InputFormField<typeof ConnectionFormSchema>
                control={form.control}
                name="token"
                label="Token"
                inputType="password"
                className="grid col-span-full"
              />
            </div>
          </div>

          <div className="flex-1">
            <TestConnection
              loading={configLoading}
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
            isDirty={form.formState.isDirty}
            isEmpty={!host && !port && !token}
            isLoading={configLoading}
          />
        </form>
      </Form>
    </div>
  );
};
