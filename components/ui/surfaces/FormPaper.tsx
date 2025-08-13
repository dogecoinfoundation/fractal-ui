import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const FormPaper = ({
  children,
  className,
  ...props
}: ComponentProps<"form">) => {
  return (
    <form
      className={cn(
        "flex flex-col gap-4 z-10 border-zinc-300 border-1 rounded-sm bg-white p-4 shadow-sm shadow-zinc-300/50",
        className,
      )}
      {...props}
    >
      {children}
    </form>
  );
};
