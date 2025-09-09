import Link from "next/link";
import { WidgetContainer } from "@/components/ui/widget/widget-container";
import { useAPI } from "@/hooks/useAPI";
import { Balance } from "@/app/api/balance/route";
import { Wallet } from "@/generated/prisma";
import { WalletContext } from "@/context/wallet-context";
import { useContext } from "react";

export const BalanceContent = () => {
  const { wallet } = useContext(WalletContext);
  const { data, isLoading, error } = useAPI<Balance[]>(
    `/api/balance?_wallet=${wallet?.name}`,
  );

  return (
    <Link href="/balance/add">
      <WidgetContainer>
        <h3 className="text-sm font-semibold">Balance for {wallet?.name}</h3>
        {error ? <p>Error fetching balance.</p> : null}
        {isLoading ? <p>Loading...</p> : null}
        {data?.map((balance) => (
          <div
            key={balance.current}
            className="flex flex-row items-center gap-2 text-2xl font-bold leading-6"
          >
            <p className="text-transparent bg-clip-text bg-gradient-to-t from-yellow-600 to-yellow-400 tabular-nums">
              {balance.current}
            </p>
          </div>
        ))}
      </WidgetContainer>
    </Link>
  );
};
