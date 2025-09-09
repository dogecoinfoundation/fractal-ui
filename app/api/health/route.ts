import { GetFractalEngineHealth } from "@/lib/fractal-engine-client";
import { GetIndexerHealth } from "@/lib/indexer-client";
import { NextResponse } from "next/server";

export type Health = {
  current_block_height: number;
  latest_block_height: number;
  chain: string;
  wallets_enabled: boolean;
  version: string;
  fractal_engine_url: string;
  indexer_url: string;
  indexer_connected: boolean;
  fractal_engine_connected: boolean;
};

export async function GET() {
  try {
    const feHealth = await GetFractalEngineHealth();
    const indexerHealth = await GetIndexerHealth();
    const health = {
      ...feHealth,
      ...indexerHealth,
    };

    return NextResponse.json<Health>(health);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch health." },
      { status: 500 },
    );
  }
}
