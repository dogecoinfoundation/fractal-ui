"use client";

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

type SeedPhraseTileProps = {
  word: string;
  position: number;
  isCandidate?: boolean;
  valid?: boolean;
  invalid?: boolean;
  dirty?: boolean;
};

const positionVariants = cva("rounded-l-sm px-2 py-1 select-none", {
  variants: {
    isCandidate: {
      true: null,
      false: null,
    },
    dirty: {
      true: null,
      false: "bg-amber-400 text-white border-1 border-amber-400",
    },
    valid: {
      true: null,
      false: null,
    },
    invalid: {
      true: null,
      false: null,
    },
  },
  compoundVariants: [
    // Non-Candidate
    {
      isCandidate: false,
      dirty: false,
      valid: false,
      invalid: false,
      className: "bg-zinc-100 text-zinc-400 border-1 border-zinc-200",
    },
    // Candidate and Valid
    {
      isCandidate: true,
      dirty: true,
      valid: true,
      invalid: false,
      className: "bg-green-400 text-white border-1 border-green-400",
    },
    // Candidate and Invalid
    {
      isCandidate: true,
      dirty: true,
      valid: false,
      invalid: true,
      className: "bg-red-400 text-white border-1 border-red-400",
    },
  ],
});

const wordVariants = cva(
  "rounded-r-sm flex-1 px-2 py-1 truncate tabular-nums",
  {
    variants: {
      isCandidate: {
        true: null,
        false: null,
      },
      dirty: {
        true: null,
        false:
          "bg-amber-50 text-amber-600 border-1 border-amber-400/50 border-l-0",
      },
      valid: {
        true: null,
        false: null,
      },
      invalid: {
        true: null,
        false: null,
      },
    },
    compoundVariants: [
      // Non-Candidate
      {
        isCandidate: false,
        dirty: false,
        valid: false,
        invalid: false,
        className:
          "bg-zinc-50 text-zinc-600 border-1 border-zinc-200 border-l-0",
      },
      // Candidate and Valid
      {
        isCandidate: true,
        dirty: true,
        valid: true,
        invalid: false,
        className:
          "bg-green-50 text-green-600 border-1 border-green-600/30 border-l-0",
      },
      // Candidate and Invalid
      {
        isCandidate: true,
        dirty: true,
        valid: false,
        invalid: true,
        className:
          "bg-red-50 text-red-600 border-1 border-red-400/50 border-l-0",
      },
    ],
  },
);

export const SeedPhraseTile = ({
  word,
  position,
  isCandidate,
  valid,
  invalid,
  dirty,
}: SeedPhraseTileProps) => {
  return (
    <div
      className="flex flex-row items-center font-mono border-0 rounded-sm animate-swing-in text-sm transition-colors shadow-crisp shadow-zinc-200/40 select-none"
      style={{
        animationDelay: `${position * 40}ms`,
      }}
    >
      <div
        className={cn(
          positionVariants({
            isCandidate,
            dirty,
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
            isCandidate,
            dirty,
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
