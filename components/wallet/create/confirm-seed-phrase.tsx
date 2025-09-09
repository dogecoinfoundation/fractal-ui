"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/forms/input-form-field";
import { ValidateSeedPhrase } from "@/components/wallet/create/seed-phrase/seed-phrase-words";
import { WalletSection } from "@/components/wallet/wallet-section";
import { AuthContext } from "@/context/auth-context";
import { SeedPhraseContext } from "@/context/seedphrase-context";
import { WalletContext } from "@/context/wallet-context";
import { useRouter } from "next/navigation";

export const ConfirmSeedPhrase = () => {
  const router = useRouter();
  const { seedPhrase, setSeedPhrase, candidates, setStatus } =
    useContext(SeedPhraseContext);
  const { password } = useContext(AuthContext);
  const { refreshWalletData } = useContext(WalletContext);

  const getRefiner = (index: number) =>
    z
      .string()
      .toLowerCase()
      .refine((value) => value === candidates[index].word, {
        error: `Word ${candidates[index].position} is incorrect.`,
      });

  const SeedPhraseSchema = z.object({
    word1: getRefiner(0),
    word2: getRefiner(1),
    word3: getRefiner(2),
    name: z.string().min(2).max(100),
  });

  const form = useForm<z.infer<typeof SeedPhraseSchema>>({
    resolver: zodResolver(SeedPhraseSchema),
    defaultValues: {
      word1: "",
      word2: "",
      word3: "",
      name: "",
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const allFields = form.watch();

  const onSubmit = async () => {
    try {
      const response = await fetch("/api/wallet/create", {
        method: "POST",
        body: JSON.stringify({ name: allFields.name, seedPhrase, password }),
      });
      await response.json();
      refreshWalletData();

      router.push("/wallet");
    } catch (error) {
      console.error(error);
      setStatus("ERROR");
    }
  };

  const candidatesMap = useMemo(
    () => new Map(candidates.map((c) => [c.word, c])),
    [candidates],
  );

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

            <ValidateSeedPhrase
              seedPhrase={seedPhrase}
              candidatesMap={candidatesMap}
              fields={allFields}
            />
          </div>

          <div className="grid grid-cols-4 gap-8">
            <InputFormField
              required
              control={form.control}
              name="name"
              label={`Wallet Name`}
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
              Create Wallet
            </Button>
          </div>
        </WalletSection>
      </form>
    </Form>
  );
};
