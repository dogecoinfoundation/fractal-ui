import {
  Activity,
  EthernetPort,
  Factory,
  MessageCircleHeart,
  RefreshCw,
  SatelliteDish,
  Send,
  Wifi,
} from "lucide-react";
import useSWR from "swr";
import type { Health } from "@/app/api/health/route";
import { StatusCard } from "@/components/status/status-card/status-card";
import {
  Monospace,
  StatusSection,
} from "@/components/status/status-card/status-section";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const fetcher = (url: string): Promise<Health> =>
  fetch(url).then((res) => res.json());

export const FractalEngineStatus = () => {
  const { data, isLoading, error } = useSWR("/api/health", fetcher);

  return (
    <StatusCard
      title="Fractal Engine"
      titleIcon={<Factory className="size-4 text-muted-foreground" />}
    >
      <StatusSection
        title="Connection"
        titleIcon={EthernetPort}
        items={[
          {
            id: "fe-connection-status",
            value: (
              <>
                <Wifi className="size-4 text-creative" />
                Currently connected to Fractal Engine{" "}
                <Monospace>v1.2.3</Monospace> on{" "}
                <Monospace>128.64.32.16</Monospace>
              </>
            ),
          },
          {
            id: "fe-example-connection-metric-1",
            value: (
              <>
                <SatelliteDish className="size-4 text-indigo-500" />
                Example connection metric 001
              </>
            ),
          },
          {
            id: "fe-example-connection-metric-2",
            value: (
              <>
                <Send className="size-4 text-stone-500" />
                Example connection metric 002
              </>
            ),
          },
        ]}
      />

      <StatusSection
        title="Health"
        titleIcon={Activity}
        items={[
          {
            id: "fe-health-status",
            value: (
              <>
                <MessageCircleHeart className="size-4 text-creative" />
                External Gossip Nodes: <Monospace>1337</Monospace>
              </>
            ),
          },
          {
            id: "fe-block-status",
            value: (
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <RefreshCw className="size-4 text-creative" />
                  Block Status:
                </div>
                {data ? (
                  <Tooltip>
                    <TooltipTrigger>
                      <Progress
                        value={
                          (data.current_block_height /
                            data.latest_block_height) *
                          100
                        }
                        className="h-4 rounded-sm"
                      />
                    </TooltipTrigger>
                    <TooltipContent align="end">
                      <div className="flex flex-col gap-1">
                        <p className="flex items-center justify-between gap-2">
                          <span className="font-semibold">
                            Current block height:
                          </span>
                          <code className="text-xs proportional-nums">
                            {Math.round(
                              data.current_block_height,
                            ).toLocaleString()}
                          </code>
                        </p>
                        <p className="flex items-center justify-between gap-2">
                          <span className="font-semibold">
                            Latest block height:
                          </span>
                          <code className="proportional-nums">
                            {Math.round(
                              data.latest_block_height,
                            ).toLocaleString()}
                          </code>
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ) : null}
              </div>
            ),
          },
        ]}
      />
    </StatusCard>
  );
};
