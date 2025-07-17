import type { ReactNode } from "react";

export const GridPaper = ({ children }: { children: ReactNode }) => {
  return (
    <section className="relative overflow-y-auto flex flex-col flex-1 justify-start items-start rounded-sm p-4 border-1 border-blue-500/30 bg-blue-100/20">
      <svg
        className="absolute inset-0 pointer-events-none z-[-1] size-full fill-blue-300 stroke-blue-300 opacity-30"
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
