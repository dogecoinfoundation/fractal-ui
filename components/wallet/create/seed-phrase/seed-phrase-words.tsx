import { GridPaper } from "@/components/ui/surfaces/GridPaper";
import {
  MASK,
  StaticWordTile,
  ValidateWordTile,
  type ValidateWordTileProps,
} from "@/components/wallet/create/seed-phrase/seed-phrase-tile";
import type { Candidate } from "@/context/seedphrase-context";

type ValidateSeedPhraseProps = {
  seedPhrase: string[];
  candidatesMap: Map<string, Candidate>;
  fields: Record<`word${number}`, string>;
};

const maskWord = (word: string, input: string) => {
  // Return just the input string if it matches the word
  if (input === word) return input;

  if (input) {
    if (input === "") return MASK;

    const maskedCharacters = Array.from(
      { length: MASK.length - (input?.length || 0) },
      () => "*",
    ).join("");

    // Return the input with the remaining characters masked with an asterisk
    return `${input}${maskedCharacters}`;
  }

  return MASK;
};

export const StaticSeedPhrase = ({
  seedPhrase,
  mask,
}: {
  seedPhrase: string[];
  mask?: boolean;
}) => {
  return (
    <GridPaper>
      <div className="grid grid-cols-4 grid-flow-col gap-2 grid-rows-6 w-full bg-blue-50/50 z-10">
        {seedPhrase.map((word, index) => {
          const position = index + 1;

          return (
            <StaticWordTile
              key={`${position}-${word}`}
              word={mask ? MASK : word}
              position={position}
            />
          );
        })}
      </div>
    </GridPaper>
  );
};

export const ValidateSeedPhrase = ({
  seedPhrase,
  candidatesMap,
  fields,
}: ValidateSeedPhraseProps) => {
  return (
    <GridPaper className="col-span-3 w-full">
      <div className="grid col-span-3 grid-cols-4 grid-flow-col gap-2 grid-rows-6 w-full bg-blue-50/50 z-10">
        {seedPhrase.map((word, index) => {
          const position = index + 1;
          const candidate = candidatesMap.get(word);

          if (candidate) {
            const field = fields[candidate.key as keyof typeof fields];
            let status: ValidateWordTileProps["status"] = "idle";
            if (candidate.word === field) status = "valid";
            if (field && candidate.word !== field) status = "invalid";

            return (
              <ValidateWordTile
                key={`${position}-${word}`}
                word={maskWord(candidate.word, field)}
                position={position}
                status={status}
              />
            );
          }

          return (
            <StaticWordTile
              key={`${position}-${word}`}
              word={MASK}
              position={position}
            />
          );
        })}
      </div>
    </GridPaper>
  );
};
