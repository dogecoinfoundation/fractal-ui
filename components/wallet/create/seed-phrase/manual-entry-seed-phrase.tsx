import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp, TriangleAlert } from "lucide-react";
import { useContext, useEffect, useState } from "react";
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

const defaultValues = {
  word01: "",
  word02: "",
  word03: "",
  word04: "",
  word05: "",
  word06: "",
  word07: "",
  word08: "",
  word09: "",
  word10: "",
  word11: "",
  word12: "",
  word13: "",
  word14: "",
  word15: "",
  word16: "",
  word17: "",
  word18: "",
  word19: "",
  word20: "",
  word21: "",
  word22: "",
  word23: "",
  word24: "",
};

const wordSchema = (index: number) =>
  z.string().nonempty({ error: `Word ${index} is required.` });

const ManualEntrySeedPhraseSchema = z.object({
  word01: wordSchema(1),
  word02: wordSchema(2),
  word03: wordSchema(3),
  word04: wordSchema(4),
  word05: wordSchema(5),
  word06: wordSchema(6),
  word07: wordSchema(7),
  word08: wordSchema(8),
  word09: wordSchema(9),
  word10: wordSchema(10),
  word11: wordSchema(11),
  word12: wordSchema(12),
  word13: wordSchema(13),
  word14: wordSchema(14),
  word15: wordSchema(15),
  word16: wordSchema(16),
  word17: wordSchema(17),
  word18: wordSchema(18),
  word19: wordSchema(19),
  word20: wordSchema(20),
  word21: wordSchema(21),
  word22: wordSchema(22),
  word23: wordSchema(23),
  word24: wordSchema(24),
});

const getValidationComponent = (
  isValid: boolean,
  isDirty: boolean,
  error?: string,
) => {
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

  if (!isDirty) return null;

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
        form.setValue(key, value, { shouldDirty: true });
      });
      form.trigger();
    }
  }, [pastedValues, form.setValue, form.trigger]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <GridPaper>
          <div className="grid grid-cols-4 grid-flow-col gap-4 grid-rows-6 w-full border-1 rounded-sm border-blue-100 bg-blue-50 z-10 backdrop-blur-xs p-4">
            {Array.from({ length: 24 }).map((_, index) => {
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
            })}
          </div>
        </GridPaper>

        {getValidationComponent(
          form.formState.isValid,
          form.formState.isDirty,
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
