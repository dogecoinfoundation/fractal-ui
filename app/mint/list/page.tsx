"use client";

import useSWR from "swr";
import type { ApiMint, Mint } from "@/app/api/mints/route";
import { MintCard } from "@/app/mint/list/mint-card";
import { PageContainer } from "@/components/page-container";
import { Skeleton } from "@/components/ui/skeleton";

const mapApiMintsToMints = (data: ApiMint[]): Mint[] => {
  return data.map((mint) => ({
    ...mint,
    tags: JSON.parse(mint.tags),
    metadata: JSON.parse(mint.metadata),
  }));
};

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => mapApiMintsToMints(json));

export default function ListMints() {
  const { data, isLoading, error } = useSWR("/api/mints", fetcher);

  return (
    <PageContainer label="Minted Assets">
      <section className="overflow-y-auto flex flex-col flex-1 gap-2 bg-gray-100 border-1 border-gray-300 rounded-sm p-2">
        {error && <h1>Error fetching mints.</h1>}
        {isLoading && <Skeleton className="h-10 w-full" />}
        {data?.map((mint) => (
          <MintCard key={mint.id} mint={mint} />
        ))}
      </section>
    </PageContainer>
  );
}
