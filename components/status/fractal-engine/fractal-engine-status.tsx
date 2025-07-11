import {
  Activity,
  EthernetPort,
  Factory,
  MessageCircleHeart,
  SatelliteDish,
  Send,
  Wifi,
} from "lucide-react";
import { BlockStatus } from "@/components/status/fractal-engine/block-status";
import { StatusCard } from "@/components/status/status-card/status-card";
import {
  Monospace,
  StatusSection,
} from "@/components/status/status-card/status-section";

export const FractalEngineStatus = () => {
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
            value: <BlockStatus />,
          },
        ]}
      />
    </StatusCard>
  );
};
