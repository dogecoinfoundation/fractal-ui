import { GetFractalEngineHealth } from "@/lib/fractal-engine-client";
import { NextResponse } from "next/server";

export type Health = {
  current_block_height: number;
  latest_block_height: number;
  chain: string;
  wallets_enabled: boolean;
  version: string;
};

export async function GET() {
  try {
    const health = await GetFractalEngineHealth();

    return NextResponse.json<Health>(health);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch health." },
      { status: 500 },
    );
  }
}
