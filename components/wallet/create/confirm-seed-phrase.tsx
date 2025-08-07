"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import z from "zod/v4";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/forms/input-form-field";
import { SeedPhraseWords } from "@/components/wallet/create/seed-phrase/seed-phrase-words";
import { WalletSection } from "@/components/wallet/wallet-section";
import { AuthContext } from "@/context/auth-context";
import { SeedPhraseContext } from "@/context/seedphrase-context";

export const ConfirmSeedPhrase = () => {
  const { seedPhrase, setSeedPhrase, candidates, setStatus } =
    useContext(SeedPhraseContext);
  const { password } = useContext(AuthContext);

  const words = [
    candidates[0].word,
    candidates[1].word,
    candidates[2].word,
  ] as const;

  const SeedPhraseSchema = z.object({
    word1: z
      .string()
      .toLowerCase()
      .refine((value) => value === candidates[0].word, {
        error: `Word ${candidates[0].position} is incorrect.`,
      }),
    word2: z.enum(words).extract([candidates[1].word], {
      error: `Word ${candidates[1].position} is incorrect.`,
    }),
    word3: z.enum(words).extract([candidates[2].word], {
      error: `Word ${candidates[2].position} is incorrect.`,
    }),
  });

  const form = useForm<z.infer<typeof SeedPhraseSchema>>({
    resolver: zodResolver(SeedPhraseSchema),
    defaultValues: {
      word1: "",
      word2: "",
      word3: "",
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const allFields = form.watch();

  const onSubmit = async () => {
    try {
      const response = await fetch("/api/wallet/create", {
        method: "POST",
        body: JSON.stringify({ seedPhrase, password }),
      });
      await response.json();
      setStatus("CONFIRMED");
    } catch (error) {
      console.error(error);
      setStatus("ERROR");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <WalletSection className="gap-8">
          <Alert variant="info" className="flex flex-row items-center gap-2">
            <AlertDescription>
              <p>
                To confirm you've securely saved your seed phrase, please enter
                words
                <strong> {candidates[0].position}</strong>,
                <strong> {candidates[1].position}</strong>, and
                <strong> {candidates[2].position} </strong>
                in the text boxes below:
              </p>
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-4 gap-8">
            <div className="flex flex-col gap-4 col-span-1 justify-between">
              <InputFormField
                required
                key={candidates[0].position}
                control={form.control}
                name="word1"
                label={`Word ${candidates[0].position}`}
              />
              <InputFormField
                required
                key={candidates[1].position}
                control={form.control}
                name="word2"
                label={`Word ${candidates[1].position}`}
              />
              <InputFormField
                required
                key={candidates[2].position}
                control={form.control}
                name="word3"
                label={`Word ${candidates[2].position}`}
              />
            </div>

            <SeedPhraseWords
              mask
              seedPhrase={seedPhrase}
              candidates={candidates}
              allFields={allFields}
              confirming
              className="grid grid-cols-3 col-span-3"
            />
          </div>

          <div className="flex flex-row gap-2 justify-between">
            <Button
              className="flex-1"
              type="button"
              variant="outline"
              onClick={() => {
                setSeedPhrase([]);
                setStatus("IDLE");
              }}
            >
              Back
            </Button>
            <Button
              className="flex-1"
              type="submit"
              disabled={!form.formState.isValid}
            >
              Next
            </Button>
          </div>
        </WalletSection>
      </form>
    </Form>
  );
};
