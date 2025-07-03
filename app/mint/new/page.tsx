"use client";

import useSWR from "swr";
import type { Mint, NewMint } from "@/app/api/mints/route";
import { Header } from "@/components/header";
import { Separator } from "@/components/separator";

const fetcher = (url: string): Promise<Mint[]> =>
  fetch(url).then((res) => res.json());

export default function MintNewAsset() {
  const { data, mutate } = useSWR("/api/mints", fetcher);

  const createMockMint = async () => {
    const newMint: NewMint = {
      title: "Test",
      description: "Test",
      metadata: {},
      fraction_count: 1,
      feed_url: "https://example.com",
      tags: ["new"],
    };

    try {
      await fetch("/api/mints", {
        method: "POST",
        body: JSON.stringify(newMint),
      });
      await mutate();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Header label="Mint an Asset" />
      <Separator />
      <div className="overflow-y-auto flex flex-col flex-1 justify-start items-start bg-gray-100 border-1 border-gray-300 rounded-sm p-4">
        <form className="min-w-xl h-xl flex-0 bg-white/80 border-zinc-300 border-1 rounded-sm p-4">
          Placeholder
        </form>
      </div>
    </>
  );
}
