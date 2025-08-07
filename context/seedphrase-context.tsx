import { createContext } from "react";

export type SeedPhraseStatus =
  | "IDLE"
  | "ERROR"
  | "GENERATED"
  | "UNCONFIRMED"
  | "CONFIRMED";

type SeedPhraseContextType = {
  status: SeedPhraseStatus;
  setStatus: (status: SeedPhraseStatus) => void;
  seedPhrase: string[];
  setSeedPhrase: (seedPhrase: string[]) => void;
  candidates: { position: number; word: string }[];
  generate: () => Promise<void>;
};

export const SeedPhraseContext = createContext<SeedPhraseContextType>({
  status: "IDLE",
  setStatus: () => {},
  seedPhrase: [],
  setSeedPhrase: () => {},
  candidates: [],
  generate: () => Promise.resolve(),
});
