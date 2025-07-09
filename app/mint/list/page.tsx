"use client";

import { useState } from "react";
import useSWR from "swr";
import type { Mint } from "@/app/api/mints/route";
import { MintCard } from "@/components/mints/mint-card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Paper } from "@/components/ui/surfaces/Paper";
import { cn } from "@/lib/utils";

const fetcher = (url: string): Promise<Mint[]> =>
  fetch(url).then((res) => res.json());

export default function ListMints() {
  const [activeMint, setActiveMint] = useState<Mint | null>(null);
  const [filterText, setFilterText] = useState("");
  const { data, isLoading, error } = useSWR("/api/mints", fetcher);
  return (
    <Paper className="h-full p-0">
      {error ? <h1>Error fetching mints.</h1> : null}

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

          <div className="flex flex-col h-full overflow-auto border-t-1 border-gray-300 bg-white">
            {isLoading ? (
              <div className="flex flex-col justify-start items-start h-full p-2 gap-2">
                {Array.from({ length: 10 }).map((_, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <Not that crucial for multiple skeleton placeholders.>
                  <Skeleton key={index} className="h-12 w-full rounded-xs" />
                ))}
              </div>
            ) : (
              data
                ?.filter((mint) =>
                  mint.title.toLowerCase().includes(filterText.toLowerCase()),
                )
                .map((mint) => (
                  <button
                    type="button"
                    key={mint.id}
                    className={cn(
                      "flex flex-col gap-1 w-full justify-start items-center cursor-pointer text-left text-sm bg-white/80 hover:bg-gray-100 transition-colors p-2",
                      activeMint?.id === mint.id
                        ? "bg-blue-100/65 hover:bg-blue-100/65 [&>h2]:text-blue-900 [&>h3]:text-blue-900/85"
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
                  </button>
                ))
            )}
          </div>
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
              {isLoading
                ? "Loading..."
                : "Please select a mint from the list to the left."}
            </div>
          )}
        </div>
      </div>
    </Paper>
  );
}
