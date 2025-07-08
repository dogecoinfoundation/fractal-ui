"use client";

import { useState } from "react";
import useSWR from "swr";
import type { Mint } from "@/app/api/mints/route";
import { MintCard } from "@/components/mints/mint-card";
import { Separator } from "@/components/separator";
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
    <Paper className="h-full">
      {error ? <h1>Error fetching mints.</h1> : null}
      {isLoading ? <Skeleton className="h-10 w-full" /> : null}

      <div className="flex flex-row h-full overflow-hidden">
        <div className="w-80 flex flex-col overflow-auto rounded-tl-xs rounded-bl-xs border-1 border-transparent">
          <div className="p-1">
            <Input
              placeholder="Search for an asset"
              id="filter-assets"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <Separator className="mt-2 mb-1" />
          <div className="flex flex-col gap-1">
            {data
              ?.filter((mint) =>
                mint.title.toLowerCase().includes(filterText.toLowerCase()),
              )
              .map((mint) => (
                <button
                  type="button"
                  key={mint.id}
                  className={cn(
                    "flex flex-col gap-1 w-full justify-start items-center cursor-pointer text-left text-sm border-gray-300 bg-gray-200/40 hover:bg-gray-200/80 transition-colors border-1 rounded-xs p-1",
                    activeMint?.id === mint.id
                      ? "border-blue-800/10 bg-blue-100 hover:bg-blue-100 [&>h2]:text-blue-700 [&>h3]:text-blue-800/70"
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
              ))}
          </div>
        </div>

        <div className="flex-col flex-1 pl-2">
          {activeMint ? (
            <MintCard mint={activeMint} />
          ) : (
            "Please select a mint."
          )}
        </div>
      </div>
    </Paper>
  );
}
