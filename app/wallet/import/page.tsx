"use client";

import {
  BadgeCheck,
  Clipboard,
  Eye,
  EyeOff,
  FileUp,
  TriangleAlert,
} from "lucide-react";
import { redirect } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { GridPaper } from "@/components/ui/surfaces/GridPaper";
import { Paper } from "@/components/ui/surfaces/Paper";
import { StaticSeedPhrase } from "@/components/wallet/create/seed-phrase/seed-phrase-words";
import { WalletSection } from "@/components/wallet/wallet-section";
import { AuthContext } from "@/context/auth-context";
import { useAPI } from "@/hooks/useAPI";

const ImportSchema = z.object({
  seedPhrase: z.array(z.string()).min(24).max(24),
});

const parseInput = (text: string) => {
  const parsed = ImportSchema.safeParse({ seedPhrase: text.split("\n") });
  return parsed;
};

export default function ImportWallet() {
  const { data } = useAPI<{ walletExists: boolean }>("/api/wallet");

  const { password } = useContext(AuthContext);
  const [status, setStatus] = useState<
    "IDLE" | "VALID" | "INVALID" | "ERROR" | "CONFIRMED"
  >("IDLE");
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const [mask, setMask] = useState(true);
  const toggleMask = () => setMask((p) => !p);

  const validateText = useCallback((text: string) => {
    const parsed = parseInput(text);
    if (parsed.success) {
      setSeedPhrase(parsed.data.seedPhrase);
      setStatus("VALID");
    } else {
      setStatus("INVALID");
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

  if (data?.walletExists) return redirect("/wallet");

  const pasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    if (text) validateText(text);
  };

  const getValidationComponent = () => {
    if (status === "IDLE") return null;

    if (status === "ERROR")
      return (
        <Alert variant="error">
          <AlertDescription>
            <p>An error has occurred. Please reload the page and try again.</p>
          </AlertDescription>
        </Alert>
      );

    if (status === "INVALID")
      return (
        <Alert variant="error">
          <AlertDescription>
            <p>Pasted seed phrase is invalid. Please try again.</p>
          </AlertDescription>
        </Alert>
      );

    if (status === "VALID")
      return (
        <Alert variant="success">
          <AlertDescription>
            <p>
              The pasted seed phrase appears to be valid. Please click{" "}
              <strong>Show</strong> and then double check, then click Import to
              complete the process.
            </p>
          </AlertDescription>
        </Alert>
      );
  };

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
    <Paper>
      {status === "CONFIRMED" ? (
        <div className="flex flex-col h-full gap-2 items-center justify-center text-2xl">
          <BadgeCheck className="size-10 text-emerald-500" />
          <p className="text-emerald-700 text-center">
            Wallet succesfully configured!
          </p>
        </div>
      ) : (
        <WalletSection className="h-full">
          <Alert
            variant="info"
            className="flex flex-row items-center justify-between gap-2"
          >
            <AlertDescription>
              <p>
                If you have an existing wallet, you can import it here. Please
                copy your seed phrase to the clipboard and then click
                <strong> Paste from Clipboard </strong> to continue.
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

          <div className="grid grid-cols-4 gap-4">
            {seedPhrase.length > 0 ? (
              <div className="col-span-4 flex flex-col gap-4">
                <StaticSeedPhrase
                  seedPhrase={seedPhrase}
                  mask={mask}
                  className="flex-1"
                />

                {getValidationComponent()}

                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={
                      seedPhrase.length === 0 ? "outline" : "destructive"
                    }
                    onClick={() => {
                      setSeedPhrase([]);
                      setStatus("IDLE");
                    }}
                    disabled={seedPhrase.length === 0}
                  >
                    <TriangleAlert />
                    Clear
                  </Button>
                  <Button
                    variant="outline"
                    onClick={toggleMask}
                    disabled={seedPhrase.length === 0}
                  >
                    {mask ? <Eye /> : <EyeOff />}
                    {mask ? "Show" : "Hide"}
                  </Button>
                  <Button variant="creative" onClick={onSubmit}>
                    <FileUp />
                    Import
                  </Button>
                </div>
              </div>
            ) : (
              <GridPaper className="col-span-4">
                <div className="flex flex-col flex-1 gap-2 self-stretch justify-center items-center text-blue-800 select-none">
                  <div className="backdrop-blur-xs p-3">
                    <p className="animate-pulse">
                      Waiting for seed phrase to be pasted...
                    </p>
                  </div>
                </div>
              </GridPaper>
            )}
          </div>
        </WalletSection>
      )}
    </Paper>
  );
}
