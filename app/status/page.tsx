"use client";

import { DogeCoinCoreStatus } from "@/components/status/dogecoin-core-status";
import { FractalEngineStatus } from "@/components/status/fractal-engine/fractal-engine-status";
import { Paper } from "@/components/ui/surfaces/Paper";

export default function StatusPage() {
  return (
    <Paper className="gap-4 p-4">
      <FractalEngineStatus />
      <DogeCoinCoreStatus />
    </Paper>
  );
}
