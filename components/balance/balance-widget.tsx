import Link from "next/link";
import type { Balance } from "@/app/api/balance/route";
import { WidgetContainer } from "@/components/ui/widget/widget-container";
import { useAPI } from "@/hooks/useAPI";

export const BalanceWidget = () => {
  const { data, isLoading, error } = useAPI<Balance[]>("/api/balance");

  return (
    <Link href="/balance/add">
      <WidgetContainer>
        <h3 className="text-sm font-semibold">Balance</h3>
        {error ? <p>Error fetching balance.</p> : null}
        {isLoading ? <p>Loading...</p> : null}
        {data
          ? data?.map((balance) => (
              <div
                key={balance.currency}
                className="flex flex-row items-center gap-2 text-2xl font-bold leading-6"
              >
                <p className="font-semibold text-muted-foreground">
                  {balance.symbol}
                </p>
                <p className="text-transparent bg-clip-text bg-gradient-to-t from-yellow-600 to-yellow-400 tabular-nums">
                  {balance.value}
                </p>
              </div>
            ))
          : null}
      </WidgetContainer>
    </Link>
  );
};
