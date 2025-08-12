import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp, TriangleAlert } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/forms/input-form-field";
import { GridPaper } from "@/components/ui/surfaces/GridPaper";
import { AuthContext } from "@/context/auth-context";

type ManualEntrySeedPhraseProps = {
  pastedValues: string[];
  setWalletCreated: (walletCreated: boolean) => void;
};

const defaultValues = Object.fromEntries(
  Array.from({ length: 24 }, (_, index) => [
    `word${String(index + 1).padStart(2, "0")}`,
    "",
  ]),
);

const wordSchema = (index: number) =>
  z.string().nonempty({ error: `Word ${index} is required.` });

const ManualEntrySeedPhraseSchema = z.object(
  Object.fromEntries(
    Array.from({ length: 24 }, (_, index) => [
      `word${String(index + 1).padStart(2, "0")}`,
      wordSchema(index + 1),
    ]),
  ),
);

const getValidationComponent = (
  isValid: boolean,
  allFieldsHaveValues: boolean,
  error?: string,
) => {
  if (!allFieldsHaveValues) return null;

  if (error)
    return (
      <Alert variant="error">
        <AlertDescription>
          <p className="flex flex-col gap-1">
            An error has occurred:
            <br />
            <code className="text-xs pl-2 border-l-2 border-l-red-300 text-red-500">
              {error}
            </code>
          </p>
        </AlertDescription>
      </Alert>
    );

  if (!isValid)
    return (
      <Alert variant="error">
        <AlertDescription>
          <p>The seed phrase is invalid. Please try again.</p>
        </AlertDescription>
      </Alert>
    );

  if (isValid)
    return (
      <Alert variant="success">
        <AlertDescription>
          <p>
            Your seed phrase appears to be valid. Please click
            <strong> Import </strong> to complete the process.
          </p>
        </AlertDescription>
      </Alert>
    );
};

const getPaddedKey = (index: number) =>
  `word${String(index + 1).padStart(2, "0")}` as keyof z.infer<
    typeof ManualEntrySeedPhraseSchema
  >;

export const ManualEntrySeedPhrase = ({
  pastedValues,
  setWalletCreated,
}: ManualEntrySeedPhraseProps) => {
  const { password } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const form = useForm<z.infer<typeof ManualEntrySeedPhraseSchema>>({
    resolver: zodResolver(ManualEntrySeedPhraseSchema),
    defaultValues,
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit = async (
    data: z.infer<typeof ManualEntrySeedPhraseSchema>,
  ) => {
    try {
      const seedPhrase = Object.values(data);
      const response = await fetch("/api/wallet/create", {
        method: "POST",
        body: JSON.stringify({ seedPhrase, password }),
      });
      await response.json();
      setWalletCreated(true);
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
    }
  };

  useEffect(() => {
    if (pastedValues.length === 24) {
      pastedValues.forEach((value, index) => {
        const key = getPaddedKey(index);
        form.setValue(key, value, { shouldDirty: true, shouldTouch: true });
      });
      form.trigger();
    }
  }, [pastedValues, form.setValue, form.trigger]);

  const inputFields = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, index) => {
        const key = getPaddedKey(index);
        return (
          <InputFormField
            key={key}
            control={form.control}
            name={key}
            label={`Word ${index + 1}`}
            required
          />
        );
      }),
    [form.control],
  );

  const allFieldsHaveValues =
    Object.keys(form.formState.touchedFields).length ===
    Object.keys(defaultValues).length;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <GridPaper>
          <div className="grid grid-cols-4 grid-flow-col gap-4 grid-rows-6 w-full border-1 rounded-sm border-blue-100 bg-blue-50 z-10 backdrop-blur-xs p-4">
            {inputFields}
          </div>
        </GridPaper>

        {getValidationComponent(
          form.formState.isValid,
          allFieldsHaveValues,
          errorMessage,
        )}

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={!form.formState.isDirty ? "outline" : "destructive"}
            onClick={() => form.reset(defaultValues)}
            disabled={!form.formState.isDirty}
          >
            <TriangleAlert />
            Clear
          </Button>
          <Button
            variant="creative"
            type="submit"
            disabled={!form.formState.isValid}
          >
            <FileUp />
            Import
          </Button>
        </div>
      </form>
    </Form>
  );
};
