"use client";

import { useMemo } from "react";
import { GridPaper } from "@/components/ui/surfaces/GridPaper";
import { SeedPhraseTile } from "@/components/wallet/create/seed-phrase/seed-phrase-tile";
import { cn } from "@/lib/utils";

type SeedPhraseWordsProps = {
  seedPhrase: string[];
  confirming?: boolean;
  mask?: boolean;
  candidates?: { position: number; word: string }[];
  allFields?: Record<string, string>;
  className?: string;
};

const maskWord = (
  word: string,
  candidate?: { input?: string; position: number; word: string },
  mask?: boolean,
) => {
  const maskShape = "************";

  // Return just the input string if it matches the word
  if (candidate && candidate.input === candidate.word) return candidate.input;

  if (candidate?.input) {
    // Return the mask if the input is empty
    if (candidate.input === "") return maskShape;

    const maskedCharacters = Array.from(
      { length: maskShape.length - (candidate.input?.length || 0) },
      () => "*",
    ).join("");

    // Return the input with the remaining characters masked with an asterisk
    return `${candidate.input}${maskedCharacters}`;
  }

  if (mask) return maskShape;

  return word;
};

export const SeedPhraseWords = ({
  seedPhrase,
  mask,
  candidates,
  allFields,
  className,
}: SeedPhraseWordsProps) => {
  const combined = useMemo(
    () =>
      candidates?.map((c, index) => ({
        ...c,
        input: allFields?.[`word${index + 1}`]?.toLowerCase(),
      })),
    [candidates, allFields],
  );

  return (
    <GridPaper className={cn(className)}>
      <div className="grid col-span-3 grid-cols-4 grid-flow-col gap-2 grid-rows-6 bg-blue-50/50 z-10">
        {seedPhrase.map((word, index) => {
          const position = index + 1;
          const candidate = combined?.find((c) => c.position === position);

          let valid = false;
          let invalid = false;
          let dirty = false;

          if (candidate) {
            valid = candidate.word === candidate.input;
            invalid = candidate.word !== candidate.input;
            dirty = candidate.input !== "";
          }

          return (
            <SeedPhraseTile
              key={`${position}-${word}`}
              word={maskWord(word, candidate, mask)}
              position={position}
              isCandidate={Boolean(candidate)}
              valid={valid}
              invalid={invalid}
              dirty={dirty}
            />
          );
        })}
      </div>
    </GridPaper>
  );
};
