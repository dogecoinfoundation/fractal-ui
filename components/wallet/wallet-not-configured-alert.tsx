import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const WalletNotConfiguredAlert = () => (
  <Alert variant="error">
    <AlertDescription>
      <p>No wallet has been configured.</p>
      <Link href="/wallet" className="font-semibold underline">
        Click here to configure a wallet.
      </Link>
    </AlertDescription>
  </Alert>
);
