"use client";

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
    message: string | ReactNode;
    classes: string;
  } => {
    if (testLoading) {
      return {
        message: "Testing...",
        classes: "border-amber-500 bg-amber-50 text-amber-800",
      };
    }
    if (!result) {
      return {
        message: isValid ? (
          <span>
            Click <span className="font-semibold">Test</span> to begin.
          </span>
        ) : (
          <span>Fill out the information above to continue.</span>
        ),
        classes: "border-indigo-300 bg-indigo-50 text-indigo-700",
      };
    }
    if (result?.status === 200) {
      return {
        message: "Connection successful!",
        classes: "border-emerald-700/30 bg-emerald-50 text-emerald-800",
      };
    }

    return {
      message: error ?? "Connection failed",
      classes: "border-red-300 bg-red-50 text-red-800",
    };
  };

  const resultState = getResultState();

  return (
    <div className="grid col-span-full">
      <div className="grid grid-cols-4 gap-4 min-h-10">
        <Button
          type="button"
          className="grid col-span-1 flex-1 h-full"
          disabled={testLoading || loading || !isValid}
          onClick={() => testConnection(host, port, token)}
        >
          Test
        </Button>
        <div
          className={cn(
            "flex flex-col justify-center items-center col-span-3 text-xs leading-none border-1 rounded-sm transition-colors",
            resultState.classes,
          )}
        >
          {resultState.message}
        </div>
      </div>
    </div>
  );
};
