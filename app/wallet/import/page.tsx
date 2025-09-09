"use client";

import { Clipboard } from "lucide-react";
import { redirect } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Paper } from "@/components/ui/surfaces/Paper";
import { ManualEntrySeedPhrase } from "@/components/wallet/create/seed-phrase/manual-entry-seed-phrase";
import { WalletSection } from "@/components/wallet/wallet-section";
import { WalletContext } from "@/context/wallet-context";

const ImportSchema = z.object({
  seedPhrase: z.array(z.string()).min(24).max(24),
});

export default function ImportWallet() {
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const [walletCreated, setWalletCreated] = useState(false);

  const validateText = useCallback((text: string) => {
    const parsed = ImportSchema.safeParse({ seedPhrase: text.split("\n") });

    if (parsed.success) {
      setSeedPhrase(parsed.data.seedPhrase);
    }
  }, []);

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const text = event.clipboardData?.getData("text");
      if (text) validateText(text);
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [validateText]);

  if (walletCreated) return redirect("/wallet");

  const pasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    if (text) validateText(text);
  };

  return (
    <Paper>
      <WalletSection className="h-full">
        <Alert
          variant="info"
          className="flex flex-row items-start justify-between gap-10"
        >
          <AlertDescription>
            <p>
              If you have an existing wallet, you can import it here. Please
              copy your seed phrase to the clipboard and then click
              <strong> Paste from Clipboard </strong> to continue.
              <br />
              Alternatively, you can manually enter each word of the seed phrase
              below.
              <br />
              <br />
              <strong>Note: </strong>Please ensure the seed phrase is 24 words
              in length.
            </p>
          </AlertDescription>
          <Button onClick={pasteFromClipboard}>
            <Clipboard />
            Paste from Clipboard
          </Button>
        </Alert>

        <ManualEntrySeedPhrase
          pastedValues={seedPhrase}
          setWalletCreated={setWalletCreated}
        />
      </WalletSection>
    </Paper>
  );
}
