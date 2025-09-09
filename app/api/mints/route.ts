import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { type MintWithBalance, PAGE_SIZE } from "@/lib/definitions";
import { getRandomInteger } from "@/lib/utils";
import km2 from "@houseofdoge/km2";
import { GetMyMints, MintToken } from "@/lib/fractal-engine-client";

const prisma = new PrismaClient();

export type MintsResponse = {
  mints: Mint[];
  total: number;
  page: number;
  limit: number;
};

export type Mint = {
  id: string;
  hash: string;
  title: string;
  fraction_count: number;
  metadata: any;
  description: string;
  transaction_hash: string;
  block_height: number;
  created_at: Date;
  feed_url: string;
  owner_address: string;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  // const myTokens = searchParams.get("myTokens");
  const page = Number(searchParams.get("page")) || 0;

  try {
    const mintsResponse = await GetMyMints(page, PAGE_SIZE, address);
    return NextResponse.json<MintsResponse>(mintsResponse);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch mints." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newMint = await request.json();

    const res = await MintToken(newMint);

    return NextResponse.json({
      transaction_hash: res,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create mint." },
      { status: 500 },
    );
  }
}
