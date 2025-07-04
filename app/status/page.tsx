"use client";

import { Header } from "@/components/header";
import { Separator } from "@/components/separator";
import { DogeCoinCoreStatus } from "@/components/status/dogecoin-core-status";
import { FractalEngineStatus } from "@/components/status/fractal-engine-status";
import { Paper } from "@/components/ui/surfaces/Paper";

export default function StatusPage() {
  return (
    <>
      <Header label="Status" />
      <Separator />
      <Paper className="gap-4 p-4">
        <FractalEngineStatus />
        <DogeCoinCoreStatus />
      </Paper>
    </>
  );
}
