import Link from "next/link";
import { WidgetContainer } from "@/components/ui/widget/widget-container";

type WalletContentProps = {
  isLoading: boolean;
  error: boolean;
};

export const WalletContent = ({ isLoading, error }: WalletContentProps) => {
  let widgetText = "Wallet is not configured!";

  if (error) widgetText = "Error fetching wallet.";
  if (isLoading) widgetText = "Loading...";

  return (
    <Link href="/wallet">
      <WidgetContainer>
        <h3 className="text-sm font-semibold">Wallet</h3>
        <p className="text-sm text-muted-foreground">{widgetText}</p>
      </WidgetContainer>
    </Link>
  );
};
