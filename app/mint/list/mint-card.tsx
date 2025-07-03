import { format } from "date-fns/format";
import { ArrowUpRight, Cake, Tags } from "lucide-react";
import type { Mint } from "@/app/api/mints/route";
import { Separator } from "../../../components/separator";

export const MintCard = ({ mint }: { mint: Mint }) => {
  return (
    <article className="flex flex-col gap-2 bg-white border-1 border-gray-300 hover:border-gray-400/80 rounded-sm p-2">
      <header className="flex flex-wrap justify-between items-center">
        <div className="flex flex-col gap-1">
          <div className="text-md font-semibold text-zinc-700 flex gap-1 items-center">
            <h2>{mint.title}</h2>
            <a href={mint.feed_url} target="_blank" rel="noopener noreferrer">
              <ArrowUpRight className="size-4 shrink-0 text-zinc-400 hover:text-zinc-600" />
            </a>
          </div>
          <h3 className="text-sm text-zinc-600">{mint.description}</h3>
        </div>
        <div className="flex flex-col gap-0 items-end">
          <h4 className="font-mono text-xl text-zinc-600 tabular-nums">
            {mint.fraction_count.toLocaleString()}
          </h4>
          <h5 className="text-sm font-semibold text-zinc-400">Tokens</h5>
        </div>
      </header>

      <Separator />

      <div className="flex flex-wrap gap-4 justify-between">
        <div className="flex flex-col flex-1 gap-1">
          <h5 className="text-xs font-semibold text-zinc-600">Metadata</h5>
          <pre className="h-full bg-indigo-50 border-indigo-400/40 text-indigo-800/80 border-1 rounded-sm p-2 leading-5">
            <code className="text-xs">
              {JSON.stringify(mint.metadata, null, "  ")}
            </code>
          </pre>
        </div>

        <div className="flex flex-col flex-1 gap-1">
          <h5 className="text-xs font-semibold text-zinc-600">Details</h5>
          <pre className="h-full bg-indigo-50 border-indigo-400/40 text-indigo-800/80 border-1 rounded-sm p-2 leading-5">
            <code className="text-xs">
              {JSON.stringify(
                {
                  hash: mint.hash,
                  block_height: mint.block_height,
                  transaction_hash: mint.transaction_hash,
                },
                null,
                "  ",
              )}
            </code>
          </pre>
        </div>
      </div>

      <Separator />

      <footer className="flex flex-wrap justify-between items-center">
        <div className="flex gap-1 text-xs h-4 text-zinc-600">
          <Cake className="size-4 shrink-0 text-zinc-400" />
          {`Minted on ${format(mint.created_at, "MMMM dd, yyyy 'at' h:mm a")}`}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {mint.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center justify-center rounded-xs border px-1.25 py-0.25 text-xs font-medium w-fit whitespace-nowrap shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] overflow-hidden border-transparent bg-green-200 text-green-900"
            >
              {tag}
            </span>
          ))}
          <Tags className="size-4 shrink-0 text-zinc-400" />
        </div>
      </footer>
    </article>
  );
};
