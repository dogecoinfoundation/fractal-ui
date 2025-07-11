import { cn } from "@/lib/utils";

export const Separator = ({ className }: { className?: string }) => (
  <hr className={cn("border-gray-200", className)} />
);
