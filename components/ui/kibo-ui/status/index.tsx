import type { ComponentProps, HTMLAttributes } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusProps = ComponentProps<typeof Badge> & {
  status: "connected" | "disconnected" | "healthy" | "unhealthy";
};

export const Status = ({ className, status, ...props }: StatusProps) => (
  <Badge
    className={cn("flex items-center gap-2", "group", status, className)}
    variant="secondary"
    {...props}
  />
);

export type StatusIndicatorProps = HTMLAttributes<HTMLSpanElement>;

export const StatusIndicator = ({
  className,
  ...props
}: StatusIndicatorProps) => (
  <span className="relative flex h-2 w-2" {...props}>
    <span
      className={cn(
        "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
        "group-[.connected]:bg-emerald-500",
        "group-[.disconnected]:bg-red-500",
        "group-[.healthy]:bg-green-500",
        "group-[.unhealthy]:bg-red-500",
      )}
    />
    <span
      className={cn(
        "relative inline-flex h-2 w-2 rounded-full",
        "group-[.connected]:bg-emerald-500",
        "group-[.disconnected]:bg-red-500",
        "group-[.healthy]:bg-green-500",
        "group-[.unhealthy]:bg-red-500",
      )}
    />
  </span>
);

export type StatusLabelProps = HTMLAttributes<HTMLSpanElement>;

export const StatusLabel = ({
  className,
  children,
  ...props
}: StatusLabelProps) => (
  <span className={cn("text-muted-foreground", className)} {...props}>
    {children ?? (
      <>
        <span className="hidden group-[.connected]:block">Connected</span>
        <span className="hidden group-[.disconnected]:block">Disconnected</span>
        <span className="hidden group-[.healthy]:block">Healthy</span>
        <span className="hidden group-[.unhealthy]:block">Unhealthy</span>
      </>
    )}
  </span>
);
