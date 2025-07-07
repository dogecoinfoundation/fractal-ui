import {
  Activity,
  Ambulance,
  EthernetPort,
  PawPrint,
  WifiOff,
} from "lucide-react";
import { StatusCard } from "@/components/status/status-card/status-card";
import {
  Monospace,
  StatusSection,
} from "@/components/status/status-card/status-section";

export const DogeCoinCoreStatus = () => {
  return (
    <StatusCard
      title="dogecoin-core"
      titleIcon={<PawPrint className="size-4 text-muted-foreground" />}
    >
      <StatusSection
        title="Connection"
        titleIcon={EthernetPort}
        items={[
          {
            id: "dc-connection-status",
            value: (
              <>
                <WifiOff className="size-4 text-destructive" />
                Cannot connect to <Monospace>dogecoin-core@4.5.6</Monospace> via
                <Monospace>16.32.64.128</Monospace>
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
            id: "dc-health-status",
            value: (
              <>
                <Ambulance className="size-4 text-destructive" />
                Health metrics to be determined.
              </>
            ),
          },
        ]}
      />
    </StatusCard>
  );
};
