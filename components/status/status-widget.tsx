import Link from "next/link";
import { Separator } from "@/components/separator";
import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@/components/ui/kibo-ui/status";
import { WidgetContainer } from "@/components/ui/widget/widget-container";
import { Health } from "@/app/api/health/route";

export const StatusWidget = ({
  data,
  isLoading,
  error,
}: {
  data: Health | undefined;
  isLoading: boolean;
  error: Error;
}) => {
  return (
    <Link href="/status">
      <div className="flex flex-col gap-2">
        <WidgetContainer>
          <h3 className="text-sm font-semibold">Fractal Engine</h3>
          <div className="flex flex-row justify-between items-center">
            <Status
              status={
                data?.fractal_engine_connected ? "connected" : "disconnected"
              }
            >
              <StatusIndicator />
              <StatusLabel className="font-mono text-[10px]" />
            </Status>
          </div>
        </WidgetContainer>

        <WidgetContainer>
          <h3 className="text-sm font-semibold">Indexer</h3>
          <div className="flex flex-row justify-between items-center">
            <Status
              status={data?.indexer_connected ? "connected" : "disconnected"}
            >
              <StatusIndicator />
              <StatusLabel className="font-mono text-[10px]" />
            </Status>
          </div>
        </WidgetContainer>
      </div>
    </Link>
  );
};
