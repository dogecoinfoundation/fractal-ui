import { FractalEngineClient } from "@/app/client/client";
import { NextResponse } from "next/server";

export type Health = {
  current_block_height: number;
  latest_block_height: number;
  wallets_enabled: boolean;
  chain: string;
};

export async function GET() {
  try {
    const client = new FractalEngineClient();
    const health = await client.getHealth();

    return NextResponse.json<Health>(health);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch health." },
      { status: 500 },
    );
  }
}
