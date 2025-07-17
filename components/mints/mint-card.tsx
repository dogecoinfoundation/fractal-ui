import { tz } from "@date-fns/tz";
import { format } from "date-fns/format";

import { ArrowUpRight, Cake } from "lucide-react";
import { Separator } from "@/components/separator";
import type { Mint } from "@/generated/prisma";
import { cn } from "@/lib/utils";

export const MintTimestamp = ({
  createdAt,
  timezone,
  className,
}: {
  createdAt: Date;
  timezone: string;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-row gap-1 text-xs text-zinc-600", className)}>
      <Cake className="size-4 shrink-0 text-zinc-400" />
      {`Minted on ${format(new Date(createdAt), "MMMM dd, yyyy 'at' h:mm a", {
        in: tz(timezone),
      })}`}
    </div>
  );
};

export const MintCard = ({ mint }: { mint: Mint }) => {
  return (
    <article className="flex flex-col gap-2 bg-white border-1 border-gray-300 hover:border-gray-400/80 rounded-sm p-2 h-full justify-between">
      <header className="flex flex-col gap-2">
        <div className="flex justify-between items-center gap-1">
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
        </div>
        <Separator />
      </header>

      <div className="flex flex-row flex-1 gap-4 w-full">
        <div className="flex flex-col gap-1 w-2/5">
          <h5 className="text-xs font-semibold text-zinc-600">Metadata</h5>
          <pre className="h-full bg-indigo-50 border-indigo-400/40 text-indigo-800/80 border-1 rounded-sm p-2 leading-5">
            <code className="text-xs">
              {JSON.stringify(mint.metadata, null, "  ")}
            </code>
          </pre>
        </div>

        <div className="flex flex-col gap-1 w-3/5">
          <h5 className="text-xs font-semibold text-zinc-600">Details</h5>
          <pre className="h-full bg-indigo-50 border-indigo-400/40 text-indigo-800/80 border-1 rounded-sm p-2 leading-5">
            <code className="text-xs flex-wrap overflow-x-auto">
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

      <footer className="flex flex-col gap-2">
        <Separator />
        <div className="flex flex-row gap-2 justify-between">
          <MintTimestamp
            createdAt={mint.created_at}
            timezone="Australia/Sydney"
          />
        </div>
      </footer>
    </article>
  );
};
