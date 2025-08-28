import { FractalEngineClient } from "@/lib/fractal-engine-client";
import { NextResponse } from "next/server";

export type Health = {
  current_block_height: number;
  latest_block_height: number;
  chain: string;
};

export async function GET() {
  try {
    const feClient = new FractalEngineClient("http://localhost:8720");
    const health = await feClient.health();

    return NextResponse.json<Health>(health);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch health." },
      { status: 500 },
    );
  }
}
