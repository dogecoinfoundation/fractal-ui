"use client";

import { BadgeCheck, OctagonX } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Paper } from "@/components/ui/surfaces/Paper";
import { ConfirmSeedPhrase } from "@/components/wallet/create/confirm-seed-phrase";
import { GenerateSeedPhrase } from "@/components/wallet/create/generate-seed-phrase";
import {
  type Candidate,
  SeedPhraseContext,
  type SeedPhraseStatus,
} from "@/context/seedphrase-context";
import { useAPI } from "@/hooks/useAPI";
import { fisherYatesShuffle } from "@/lib/utils";

export default function CreateWallet() {
  const { data } = useAPI<{ walletExists: boolean }>("/api/wallet");

  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [status, setStatus] = useState<SeedPhraseStatus>("IDLE");

  if (data?.walletExists) return redirect("/wallet");

  const generate = async () => {
    try {
      if (seedPhrase.length > 0) return;

      const response = await fetch("/api/wallet/generate", {
        method: "POST",
      });
      const data = await response.json();
      const seedPhraseWords: string[] = data.seedPhrase.split(" ");
      setSeedPhrase(seedPhraseWords);

      // Determine the 3 random words for confirmation of the seed phrase by:
      // Shuffling the list of seed phrase words (with their initial position included)
      // Grabbing the first 3 words
      // Sorting said words by their position value
      // Finally, mapping the result and adding a key to relate it to the form fields
      const candidates = fisherYatesShuffle<{
        word: string;
        position: number;
      }>(seedPhraseWords.map((word, index) => ({ word, position: index + 1 })))
        .slice(0, 3)
        .sort((a, b) => a.position - b.position)
        .map((word, index) => ({
          ...word,
          key: `word${index + 1}` as `word${number}`,
        }));

      setCandidates(candidates);
      setStatus("GENERATED");
    } catch (error) {
      console.error(error);
    }
  };

  const getSeedPhraseComponent = () => {
    if (status === "IDLE" || status === "GENERATED")
      return <GenerateSeedPhrase />;

    if (status === "UNCONFIRMED") return <ConfirmSeedPhrase />;

    if (status === "CONFIRMED")
      return (
        <div className="flex flex-col h-full gap-2 items-center justify-center text-2xl">
          <BadgeCheck className="size-10 text-emerald-500" />
          <p className="text-emerald-700 text-center">
            Wallet succesfully configured!
          </p>
        </div>
      );

    if (status === "ERROR")
      return (
        <div className="flex flex-col h-full gap-2 items-center justify-center text-2xl">
          <OctagonX className="size-10 text-red-500" />
          <p className="text-red-700 text-center">
            An error has occurred. Please reload the page and try again.
          </p>
        </div>
      );

    return null;
  };

  return (
    <SeedPhraseContext
      value={{
        status,
        setStatus,
        seedPhrase,
        setSeedPhrase,
        candidates,
        generate,
      }}
    >
      <Paper>{getSeedPhraseComponent()}</Paper>
    </SeedPhraseContext>
  );
}
