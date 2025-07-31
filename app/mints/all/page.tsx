"use client";

import { useState } from "react";
import { MintsSidebar } from "@/components/mints/list/mints-sidebar";
import { MintCard } from "@/components/mints/mint-card";
import { Input } from "@/components/ui/input";
import { Paper } from "@/components/ui/surfaces/Paper";
import type { Mint } from "@/generated/prisma";
import { useAPI } from "@/hooks/useAPI";
import { cn } from "@/lib/utils";

export default function AllKnownMints() {
  const [activeMint, setActiveMint] = useState<Mint | null>(null);
  const [filterText, setFilterText] = useState("");
  const { data, isLoading, error } = useAPI<Mint[]>("/api/mints");

  const getBodyText = () => {
    if (isLoading) return "Loading...";
    if (error) return "Error fetching mints!";
    if (data && data.length === 0) return "No mints found.";

    return "Please select a mint from the list to the left.";
  };

  return (
    <Paper className="h-full p-0">
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
    </Paper>
  );
}
