"use client";

import { FractalEngineStatus } from "@/components/status/fractal-engine/fractal-engine-status";
import { IndexerStatus } from "@/components/status/indexer/indexer-status";
import { Paper } from "@/components/ui/surfaces/Paper";
import { Health } from "../api/health/route";
import { useAPI } from "@/hooks/useAPI";

export default function StatusPage() {
  const healthResponse = useAPI<Health>("/api/health");

  return (
    <Paper className="gap-4 p-4">
      <FractalEngineStatus {...healthResponse} />
      <IndexerStatus {...healthResponse} />
    </Paper>
  );
}
