"use client";

import useSWR from "swr";
import type { Mint } from "@/app/api/mints/route";
import { Header } from "@/components/header";
import { MintCard } from "@/components/mints/mint-card";
import { Separator } from "@/components/separator";
import { Skeleton } from "@/components/ui/skeleton";

const fetcher = (url: string): Promise<Mint[]> =>
  fetch(url).then((res) => res.json());

export default function ListMints() {
  const { data, isLoading, error } = useSWR("/api/mints", fetcher);

  return (
    <>
      <Header label="Minted Assets" />
      <Separator />
      <section className="overflow-y-auto flex flex-col flex-1 gap-2 bg-gray-100 border-1 border-gray-300 rounded-sm p-2">
        {error && <h1>Error fetching mints.</h1>}
        {isLoading && <Skeleton className="h-10 w-full" />}
        {data?.map((mint) => (
          <MintCard key={mint.id} mint={mint} />
        ))}
      </section>
    </>
  );
}
