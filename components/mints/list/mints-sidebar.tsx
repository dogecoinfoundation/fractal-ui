import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Mint } from "@/app/api/mints/route";
import { type MintWithBalance, PAGE_SIZE } from "@/lib/definitions";
import { cn } from "@/lib/utils";

interface MintsSidebarProps {
  isLoading: boolean;
  filterText: string;
  activeMint: Mint | null;
  setActiveMint: (mint: Mint) => void;
  mints?: Mint[] | MintWithBalance[];
}

export const MintsSidebar = ({
  isLoading,
  filterText,
  mints,
  setActiveMint,
  activeMint,
}: MintsSidebarProps) => {
  const filteredMints: (Mint | MintWithBalance)[] | undefined = useMemo(
    () =>
      mints?.filter((mint: Mint | MintWithBalance) =>
        mint.title.toLowerCase().includes(filterText.toLowerCase()),
      ),
    [mints, filterText],
  );

  return (
    <div className="flex flex-col h-full overflow-auto border-t-1 border-gray-300 bg-white select-none">
      {isLoading ? (
        <div className="flex flex-col justify-start items-start h-full p-2 gap-2">
          {Array.from({ length: PAGE_SIZE }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <Not that crucial for multiple skeleton placeholders.>
            <Skeleton key={index} className="h-12 w-full rounded-xs" />
          ))}
        </div>
      ) : (
        filteredMints?.map((mint) => (
          <button
            type="button"
            key={mint.id}
            className={cn(
              "flex flex-col gap-1 w-full justify-start items-center cursor-pointer text-left text-sm border-l-2 border-l-white/80 bg-white/80 hover:bg-gray-100 hover:border-l-gray-100 transition-colors p-2",
              activeMint?.id === mint.id
                ? "border-l-2 border-l-blue-500/30 bg-blue-100/65 hover:bg-blue-100/65 hover:border-l-blue-500/30 [&>h2]:text-blue-900 [&>h3]:text-blue-900/85 [&>h4]:text-blue-900/95"
                : "",
            )}
            onClick={() => setActiveMint(mint)}
          >
            <h2 className="font-semibold text-gray-900 leading-tight text-left w-full">
              {mint.title}
            </h2>
            <h3 className="text-xs text-gray-600 text-left w-full">
              {mint.description}
            </h3>
            {"quantity" in mint ? (
              <h4 className="text-xs text-gray-500 text-left w-full font-medium">
                {mint.quantity.toLocaleString()} tokens owned out of{" "}
                {mint.fraction_count.toLocaleString()}
              </h4>
            ) : null}
          </button>
        ))
      )}
    </div>
  );
};
