import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const GridPaper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        "relative overflow-y-auto flex flex-col flex-1 w-full items-start rounded-sm p-4 border-1 border-blue-200 bg-blue-25",
        className,
      )}
    >
      <svg
        className="absolute inset-0 pointer-events-none size-full stroke-blue-200 opacity-30"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="grid-lines"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
            x="-1"
            y="-1"
          >
            <path d="M.5 30V.5H30" fill="none" strokeDasharray="0"></path>
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#grid-lines)"
        ></rect>
      </svg>
      {children}
    </section>
  );
};
