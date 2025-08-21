import Link from "next/link";
import { WidgetContainer } from "@/components/ui/widget/widget-container";

export const WalletContent = () => {
  return (
    <Link href="/wallet">
      <WidgetContainer>
        <h3 className="text-sm font-semibold">Wallet</h3>
        <p className="text-sm text-muted-foreground">
          Wallet is not configured!
        </p>
      </WidgetContainer>
    </Link>
  );
};
