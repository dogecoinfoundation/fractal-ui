import Link from "next/link";
import { WidgetContainer } from "@/components/ui/widget/widget-container";

type WalletContentProps = {
  data: { walletExists: boolean } | undefined;
  isLoading: boolean;
  error: boolean;
};

export const WalletContent = ({
  data,
  isLoading,
  error,
}: WalletContentProps) => {
  const getWidgetText = () => {
    if (error) return "Error fetching wallet.";
    if (isLoading) return "Loading...";
    if (data?.walletExists) return "Wallet is present.";

    return "Wallet is not configured!";
  };

  return (
    <Link href="/wallet">
      <WidgetContainer>
        <h3 className="text-sm font-semibold">Wallet</h3>
        <p className="text-sm text-muted-foreground">{getWidgetText()}</p>
      </WidgetContainer>
    </Link>
  );
};
