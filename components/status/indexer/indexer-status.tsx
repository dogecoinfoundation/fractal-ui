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
import { useAPI } from "@/hooks/useAPI";
import { Health } from "@/app/api/health/route";

export const IndexerStatus = ({
  data,
  isLoading,
  error,
}: {
  data: Health | undefined;
  isLoading: boolean;
  error: Error;
}) => {
  return (
    <StatusCard
      title="Indexer"
      titleIcon={<Factory className="size-4 text-muted-foreground" />}
    >
      <StatusSection
        title="Connection"
        titleIcon={EthernetPort}
        items={[
          {
            id: "idnexer-url",
            value: (
              <>
                Indexer URL <Monospace>{data?.indexer_url}</Monospace>
              </>
            ),
          },
          {
            id: "indexer-connection-status",
            value: (
              <>
                Indexer Connected{" "}
                <Monospace>{data?.indexer_connected ? "Yes" : "No"}</Monospace>
              </>
            ),
          },
        ]}
      />
    </StatusCard>
  );
};
