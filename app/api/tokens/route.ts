import { NextRequest, NextResponse } from "next/server";

import { MintWithBalanceResponse, PAGE_SIZE } from "@/lib/definitions";
import { GetMyTokens } from "@/lib/fractal-engine-client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  // const myTokens = searchParams.get("myTokens");
  const page = Number(searchParams.get("page")) || 0;

  try {
    const mintsResponse = await GetMyTokens(page, PAGE_SIZE, address);

    return NextResponse.json<MintWithBalanceResponse>(mintsResponse);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch mints." },
      { status: 500 },
    );
  }
}
