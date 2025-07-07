"use client";

import useSWR from "swr";
import type { Mint } from "@/app/api/mints/route";
import { MintCard } from "@/components/mints/mint-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Paper } from "@/components/ui/surfaces/Paper";

const fetcher = (url: string): Promise<Mint[]> =>
  fetch(url).then((res) => res.json());

export default function ListMints() {
  const { data, isLoading, error } = useSWR("/api/mints", fetcher);

  return (
    <Paper>
      {error ? <h1>Error fetching mints.</h1> : null}
      {isLoading ? <Skeleton className="h-10 w-full" /> : null}
      {data?.map((mint) => (
        <MintCard key={mint.id} mint={mint} />
      ))}
    </Paper>
  );
}
