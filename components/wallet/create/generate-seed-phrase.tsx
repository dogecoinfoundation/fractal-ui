import { Check, ClipboardCopy, Eye, EyeOff } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SeedPhraseWords } from "@/components/wallet/create/seed-phrase/seed-phrase-words";
import { WalletSection } from "@/components/wallet/wallet-section";
import { SeedPhraseContext } from "@/context/seedphrase-context";

export const GenerateSeedPhrase = () => {
  const [copied, setCopied] = useState(false);
  const [hideSeedPhrase, setHideSeedPhrase] = useState(false);

  const { seedPhrase, generate, setStatus } = useContext(SeedPhraseContext);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  if (seedPhrase.length === 0) {
    return (
      <WalletSection>
        <p>
          Click <span className="font-semibold">Generate</span> to begin the
          wallet creation process and generate your wallet's seed phrase.
        </p>
        <Button variant="creative" onClick={() => generate()}>
          Generate
        </Button>
      </WalletSection>
    );
  } else {
    return (
      <WalletSection className="gap-6">
        <Alert
          variant="warning"
          className="flex flex-row items-center justify-between gap-2"
        >
          <AlertDescription>
            Below is your unique seed phrase. Please make a copy of this and
            store it in a secure place.
          </AlertDescription>
          <Button
            variant={copied ? "creative" : "outline"}
            onClick={() => {
              setCopied(true);
              navigator.clipboard.writeText(seedPhrase.join("\n"));
            }}
          >
            {copied ? <Check /> : <ClipboardCopy />}
            Copy to Clipboard
          </Button>
        </Alert>
        <div className="flex flex-col justify-between gap-6 h-full">
          <SeedPhraseWords
            className="grid grid-cols-3"
            seedPhrase={seedPhrase}
            mask={hideSeedPhrase}
          />

          <div className="flex flex-row gap-2 justify-between">
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => setHideSeedPhrase((p) => !p)}
            >
              {hideSeedPhrase ? <Eye /> : <EyeOff />}
              {hideSeedPhrase ? "Show" : "Hide"}
            </Button>
            <Button className="flex-1" onClick={() => setStatus("UNCONFIRMED")}>
              Next
            </Button>
          </div>
        </div>
      </WalletSection>
    );
  }
};
