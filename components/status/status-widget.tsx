import Link from "next/link";
import { Separator } from "@/components/separator";
import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@/components/ui/kibo-ui/status";
import { WidgetContainer } from "@/components/ui/widget/widget-container";

export const StatusWidget = () => {
  return (
    <Link href="/status">
      <div className="flex flex-col gap-2">
        <WidgetContainer>
          <h3 className="text-sm font-semibold">Fractal Engine</h3>
          <div className="flex flex-row justify-between items-center">
            <Status status="connected">
              <StatusIndicator />
              <StatusLabel className="font-mono text-[10px]" />
            </Status>
            <Separator className="w-full" />
            <Status status="healthy">
              <StatusIndicator />
              <StatusLabel className="font-mono text-[10px]" />
            </Status>
          </div>
        </WidgetContainer>

        <WidgetContainer>
          <h3 className="text-sm font-semibold">dogecoin-core</h3>
          <div className="flex flex-row justify-between items-center">
            <Status status="disconnected">
              <StatusIndicator />
              <StatusLabel className="font-mono text-[10px]" />
            </Status>
            <Separator className="w-full" />
            <Status status="unhealthy">
              <StatusIndicator />
              <StatusLabel className="font-mono text-[10px]" />
            </Status>
          </div>
        </WidgetContainer>
      </div>
    </Link>
  );
};
