import { NextResponse } from "next/server";

export type Health = {
  current_block_height: number;
  latest_block_height: number;
};

export async function GET() {
  try {
    const health = {
      current_block_height: Math.random() * (1000000 - 1) + 1,
      latest_block_height: 1000000,
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
