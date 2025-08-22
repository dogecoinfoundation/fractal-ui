import { redirect } from "next/navigation";
import {
  type RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MintsSidebar } from "@/components/mints/list/mints-sidebar";
import { MintCard } from "@/components/mints/mint-card";
import { Input } from "@/components/ui/input";
import { WalletContext } from "@/context/wallet-context";
import type { Mint } from "@/generated/prisma";
import { useAPI } from "@/hooks/useAPI";
import { type MintsResponse, PAGE_SIZE } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { MintPagination } from "./mint-pagination";

export const ListMints = ({ showMine = false }: { showMine?: boolean }) => {
  const { walletAddress } = useContext(WalletContext);

  const [page, setPage] = useState(1);
  const [activeMint, setActiveMint] = useState<Mint | null>(null);
  const [filterText, setFilterText] = useState("");

  const { data, isLoading, error } = useAPI<MintsResponse>(
    `/api/mints?page=${page}${showMine ? `&address=${walletAddress}` : ""}`,
  );
  const [totalPages, setTotalPages] = useState(
    Math.ceil((data?.total || 0) / PAGE_SIZE),
  );

  useEffect(() => {
    const total = Math.ceil((data?.total || 0) / PAGE_SIZE);
    if (total > 0 && total !== totalPages) {
      setTotalPages(total);
    }
  }, [data?.total, totalPages]);

  if (showMine && !walletAddress) redirect("/wallet");

  const handlePrevPage = useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page]);

  const handleNextPage = useCallback(() => {
    if (page < totalPages) setPage(page + 1);
  }, [page, totalPages]);

  const getBodyText = () => {
    if (isLoading) return "Loading...";
    if (error) return "Error fetching mints!";
    if (data && data.mints.length === 0) return "No mints found.";

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
          data={data}
          setActiveMint={setActiveMint}
          activeMint={activeMint}
        />

        {data && data.total > PAGE_SIZE && (
          <MintPagination
            page={page}
            totalPages={totalPages}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          isLoading={isLoading}
          />
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
