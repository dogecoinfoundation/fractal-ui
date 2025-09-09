import { redirect } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { MintsSidebar } from "@/components/mints/list/mints-sidebar";
import { MintCard } from "@/components/mints/mint-card";
import { Input } from "@/components/ui/input";
import { WalletContext } from "@/context/wallet-context";

import { useAPI } from "@/hooks/useAPI";
import {
  type MintsResponse,
  type MintWithBalance,
  MintWithBalanceResponse,
  PAGE_SIZE,
} from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { MintPagination } from "./mint-pagination";
import { Mint } from "@/app/api/mints/route";

export const ListMints = ({
  showMine = false,
  myTokens = false,
}: {
  showMine?: boolean;
  myTokens?: boolean;
}) => {
  const { wallet } = useContext(WalletContext);

  const [page, setPage] = useState(0);
  const [activeMint, setActiveMint] = useState<Mint | MintWithBalance | null>(
    null,
  );
  const [filterText, setFilterText] = useState("");

  const parameters = new URLSearchParams();
  parameters.set("page", page.toString());
  if (showMine && wallet) parameters.set("address", wallet?.address);
  if (myTokens) parameters.set("myTokens", "true");

  const { data, isLoading, error } = useAPI<
    MintsResponse | MintWithBalanceResponse
  >(`/api/${myTokens ? "tokens" : "mints"}?${parameters.toString()}`);
  const [totalPages, setTotalPages] = useState(
    Math.ceil((data?.total || 1) / PAGE_SIZE),
  );

  useEffect(() => {
    if (!data?.total) return;

    const totalFromData = Math.ceil((data?.total || 1) / PAGE_SIZE);

    if (totalFromData !== totalPages) {
      setTotalPages(totalFromData);
    }
  }, [data?.total, totalPages]);

  if (showMine && !wallet) redirect("/wallet");

  const handlePrevPage = useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page]);

  const handleNextPage = useCallback(() => {
    if (page < totalPages) setPage(page + 1);
  }, [page, totalPages]);

  const getBodyText = () => {
    if (isLoading) return "Loading...";
    if (error) return "Error fetching mints!";
    if (data && data.mints?.length === 0) return "No mints found.";

    return "Please select a mint from the list to the left.";
  };

  return (
    <div className="flex flex-row h-full overflow-hidden">
      <div className="w-80 flex flex-col overflow-auto border-r-1 border-gray-300">
        <div className="p-3">
          <Input
            placeholder="Search for an asset"
            id="filter-assets"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <MintsSidebar
          isLoading={isLoading}
          filterText={filterText}
          mints={data?.mints}
          setActiveMint={setActiveMint}
          activeMint={activeMint}
        />

        {totalPages > 1 ? (
          <MintPagination
            page={page}
            totalPages={totalPages}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            isLoading={isLoading}
          />
        ) : null}
      </div>

      <div className="flex-col flex-1 p-2">
        {activeMint ? (
          <MintCard mint={activeMint} />
        ) : (
          <div
            className={cn(
              "flex justify-center items-center h-full text-gray-500 select-none",
              isLoading ? "text-gray-700 animate-pulse" : "",
            )}
          >
            {getBodyText()}
          </div>
        )}
      </div>
    </div>
  );
};
