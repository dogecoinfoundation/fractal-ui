import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Status,
  StatusIndicator,
  StatusLabel,
  type StatusProps,
} from "@/components/ui/kibo-ui/status";

type WidgetProps = {
  title: string;
  statuses: WidgetStatus[];
  titleRight?: number | string;
};

type WidgetStatus = {
  label: string;
  status: StatusProps["status"];
};

const Widget = ({ title, statuses, titleRight }: WidgetProps) => {
  return (
    <div className="flex flex-col bg-white border-1 border-gray-200 rounded-md gap-2 p-2">
      <div className="flex justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        {titleRight && (
          <Badge variant="secondary" className="px-1 text-muted-foreground">
            {titleRight.toLocaleString()}
          </Badge>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {statuses.map(({ status }) => (
          <Status key={status} status={status}>
            <StatusIndicator />
            <StatusLabel className="font-mono text-xs" />
          </Status>
        ))}
      </div>
    </div>
  );
};

export const StatusWidget = () => {
  return (
    <Link href="/status">
      <div className="flex flex-col gap-4">
        <Widget
          title="Fractal Engine"
          titleRight="v1.2.3"
          statuses={[
            { label: "Connection", status: "connected" },
            { label: "Health", status: "healthy" },
          ]}
        />

        <Widget
          title="dogecoin-core"
          titleRight="v.4.5.6"
          statuses={[
            { label: "Connection", status: "disconnected" },
            { label: "Health", status: "unhealthy" },
          ]}
        />
      </div>
    </Link>
  );
};
