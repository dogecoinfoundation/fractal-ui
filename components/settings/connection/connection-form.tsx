import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CallToAction } from "@/components/setup/wizard/steps/call-to-action";
import { TestConnection } from "@/components/setup/wizard/steps/test-connection";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/forms/input-form-field";
import { ConfigContext } from "@/context/config-context";

export const ConnectionFormSchema = z.object({
  fractalEngineUrl: z.url().nonempty({
    error: "Must not be empty.",
  }),
  indexerUrl: z.url().nonempty({
    error: "Must not be empty.",
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
    fractalEngineUrl: getConfigRowByKey(configData, "fractal_engine_url"),
    indexerUrl: getConfigRowByKey(configData, "indexer_url"),
  };

  const form = useForm<
    z.input<typeof ConnectionFormSchema>,
    unknown,
    z.output<typeof ConnectionFormSchema>
  >({
    resolver: zodResolver(ConnectionFormSchema),
    defaultValues: {
      fractalEngineUrl: "",
      indexerUrl: "",
    },
    values: {
      fractalEngineUrl: configRows.fractalEngineUrl?.value ?? "",
      indexerUrl: configRows.indexerUrl?.value ?? "",
    },
  });

  const [fractalEngineUrl, indexerUrl] = form.watch([
    "fractalEngineUrl",
    "indexerUrl",
  ]);

  const onSubmit = async (data: z.infer<typeof ConnectionFormSchema>) => {
    try {
      setLoading(true);
      setSaved(false);

      await fetch("/api/config", {
        method: "POST",
        body: JSON.stringify([
          { key: "fractal_engine_url", value: data.fractalEngineUrl },
          { key: "indexer_url", value: data.indexerUrl },
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
              <InputFormField
                control={form.control}
                name="fractalEngineUrl"
                label="Fractal Engine URL"
                className="grid col-span-full"
                required
              />

              <InputFormField
                control={form.control}
                name="indexerUrl"
                label="Indexer URL"
                className="grid col-span-full"
                required
              />
            </div>
          </div>

          <div className="flex-1">
            <TestConnection
              loading={configLoading}
              isValid={form.formState.isValid}
              fractalEngineUrl={fractalEngineUrl}
              indexerUrl={indexerUrl}
            />
          </div>

          <CallToAction
            handleSave={form.handleSubmit(onSubmit)}
            saved={saved}
            error={error}
            isDirty={form.formState.isDirty}
            isEmpty={!fractalEngineUrl && !indexerUrl}
            isLoading={configLoading}
          />
        </form>
      </Form>
    </div>
  );
};
