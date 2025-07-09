import { RefreshCw } from "lucide-react";
import useSWR from "swr";
import type { Health } from "@/app/api/health/route";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const fetcher = (url: string): Promise<Health> =>
  fetch(url).then((res) => res.json());

const getProgressValue = (isLoading: boolean, data?: Health) => {
  if (isLoading) return 0;
  if (!data) return 0;
  return (data.current_block_height / data.latest_block_height) * 100;
};

export const BlockStatus = () => {
  const { data, isLoading, error } = useSWR("/api/health", fetcher);

  return (
    <div className="flex flex-col gap-2 flex-1">
      <div className="flex items-center gap-2">
        <RefreshCw className="size-4 text-creative" />
        Block Status:
      </div>
      {error ? (
        <p className="text-destructive">Error fetching block status.</p>
      ) : isLoading ? (
        <Skeleton className="h-4 w-full" />
      ) : data ? (
        <Tooltip>
          <TooltipTrigger>
            <Progress
              value={getProgressValue(isLoading, data)}
              className="h-3 rounded-xs"
            />
          </TooltipTrigger>
          <TooltipContent align="end">
            {data ? (
              <div className="flex flex-col gap-1">
                <p className="flex items-center justify-between gap-2">
                  <span className="font-semibold">Current block height:</span>
                  <code className="text-xs proportional-nums">
                    {Math.round(data.current_block_height).toLocaleString()}
                  </code>
                </p>
                <p className="flex items-center justify-between gap-2">
                  <span className="font-semibold">Latest block height:</span>
                  <code className="proportional-nums">
                    {Math.round(data.latest_block_height).toLocaleString()}
                  </code>
                </p>
              </div>
            ) : null}
          </TooltipContent>
        </Tooltip>
      ) : null}
    </div>
  );
};
