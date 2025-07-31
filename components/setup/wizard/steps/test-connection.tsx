"use client";

import { cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useTestConnection } from "@/hooks/useTestConnection";
import { cn } from "@/lib/utils";

type TestConnectionProps = {
  loading: boolean;
  isValid: boolean;
  host: string;
  port: number;
  token: string;
};

const statusVariants = cva(
  "flex flex-col justify-center items-center text-xs leading-none border-1 rounded-sm transition-colors",
  {
    variants: {
      status: {
        loading: "border-yellow-500 bg-yellow-50 text-yellow-700 animate-pulse",
        success: "border-emerald-700/30 bg-emerald-50 text-emerald-800",
        error: "border-red-300 bg-red-50 text-red-800",
        idle: "border-blue-400 bg-blue-50 text-blue-600",
      },
    },
    defaultVariants: {
      status: "idle",
    },
  },
);

export const TestConnection = ({
  loading,
  isValid,
  host,
  port,
  token,
}: TestConnectionProps) => {
  const {
    result,
    loading: testLoading,
    error,
    testConnection,
  } = useTestConnection();

  const getResultState = (): {
    status: "loading" | "idle" | "success" | "error";
    message: string | ReactNode;
  } => {
    if (testLoading) {
      return {
        status: "loading",
        message: "Testing...",
      };
    }
    if (!result) {
      return {
        status: "idle",
        message: isValid ? (
          <span>
            Click <span className="font-semibold">Test</span> to begin.
          </span>
        ) : (
          <span>Fill out the information above to continue.</span>
        ),
      };
    }
    if (result?.status === 200) {
      return {
        status: "success",
        message: "Connection successful!",
      };
    }

    return {
      status: "error",
      message: error ?? "Connection failed",
    };
  };

  const resultState = getResultState();

  return (
    <div className="grid grid-cols-[220px_1fr] gap-2">
      <Button
        type="button"
        className="h-full"
        disabled={testLoading || loading || !isValid}
        onClick={() => testConnection(host, port, token)}
      >
        Test
      </Button>
      <div className={cn(statusVariants({ status: resultState.status }))}>
        {resultState.message}
      </div>
    </div>
  );
};
