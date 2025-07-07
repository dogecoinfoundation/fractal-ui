import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Paper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <section
      className={cn(
        "overflow-y-auto flex flex-col flex-1 gap-2 bg-gray-100 border-1 border-gray-300 rounded-sm p-2",
        className,
      )}
    >
      {children}
    </section>
  );
};
