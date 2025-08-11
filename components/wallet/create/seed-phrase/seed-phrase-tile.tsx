"use client";

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const MASK = "************";

export const StaticWordTile = ({
  word,
  position,
}: {
  word: string;
  position: number;
}) => {
  return (
    <div
      className="flex flex-row items-center font-mono border-0 rounded-sm animate-swing-in text-sm tabular-nums transition-colors shadow-crisp shadow-zinc-200/40 select-none"
      style={{
        animationDelay: `${position * 40}ms`,
      }}
    >
      <div className="rounded-l-sm px-2 py-1 select-none bg-zinc-100 text-zinc-400 border-1 border-zinc-200">
        {position.toString().padStart(2, "0")}
      </div>
      <div className="rounded-r-sm flex-1 px-2 py-1 truncate bg-zinc-50 text-zinc-600 border-1 border-zinc-200 border-l-0">
        {word}
      </div>
    </div>
  );
};

const positionVariants = cva("rounded-l-sm px-2 py-1 select-none", {
  variants: {
    idle: {
      true: "bg-amber-400 text-white border-1 border-amber-400",
      false: null,
    },
    valid: {
      true: "bg-green-400 text-white border-1 border-green-400",
      false: null,
    },
    invalid: {
      true: "bg-red-400 text-white border-1 border-red-400",
      false: null,
    },
  },
});

const wordVariants = cva(
  "rounded-r-sm flex-1 px-2 py-1 truncate tabular-nums",
  {
    variants: {
      idle: {
        true: "bg-amber-50 text-amber-600 border-1 border-amber-400/50 border-l-0",
        false: null,
      },
      valid: {
        true: "bg-green-50 text-green-600 border-1 border-green-600/30 border-l-0",
        false: null,
      },
      invalid: {
        true: "bg-red-50 text-red-600 border-1 border-red-400/50 border-l-0",
        false: null,
      },
    },
  },
);

export type ValidateWordTileProps = {
  word: string;
  position: number;
  status: "valid" | "invalid" | "dirty" | "idle";
};

export const ValidateWordTile = ({
  word,
  position,
  status,
}: {
  word: string;
  position: number;
  status: "valid" | "invalid" | "dirty" | "idle";
}) => {
  const idle = status === "idle";
  const valid = status === "valid";
  const invalid = status === "invalid";

  return (
    <div
      className="flex flex-row items-center font-mono border-0 rounded-sm animate-swing-in text-sm tabular-nums transition-colors shadow-crisp shadow-zinc-200/40 select-none"
      style={{
        animationDelay: `${position * 40}ms`,
      }}
    >
      <div
        className={cn(
          positionVariants({
            idle,
            valid,
            invalid,
          }),
        )}
      >
        {position.toString().padStart(2, "0")}
      </div>
      <div
        className={cn(
          wordVariants({
            idle,
            valid,
            invalid,
          }),
        )}
      >
        {word}
      </div>
    </div>
  );
};
