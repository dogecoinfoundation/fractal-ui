import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import {
  type MintsResponse,
  type MintWithBalance,
  PAGE_SIZE,
  type TokensResponse,
} from "@/lib/definitions";
import { getRandomInteger } from "@/lib/utils";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const myTokens = searchParams.get("myTokens");
  const page = Number(searchParams.get("page")) || 1;

  try {
    const total = await prisma.mint.count();
    const skip = Math.floor(Math.random() * (total - PAGE_SIZE));

    if (address) {
      // TODO: Replace with a call to Fractal Engine's "Mints" API
      // i.e. fetch GET /api/mints?address=ADDRESS
      // Currently the block below is just grabbing a few random mints
      const mints = await prisma.mint.findMany({
        take: PAGE_SIZE,
        skip,
      });

      const mintsResponse: MintsResponse = {
        mints,
        total: PAGE_SIZE,
        page,
      };

      return NextResponse.json<MintsResponse>(mintsResponse);
    }

    if (myTokens === "true") {
      const mints = await prisma.mint.findMany({
        take: PAGE_SIZE,
        skip,
      });

      const tokens: MintWithBalance[] = mints.map((mint) => ({
        ...mint,
        balance: getRandomInteger(1, mint.fraction_count),
      }));

      const tokensResponse: TokensResponse = {
        mints: tokens,
        total: PAGE_SIZE,
        page,
      };

      return NextResponse.json<TokensResponse>(tokensResponse);
    }

    const mints = await prisma.mint.findMany({
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    });
    const response: MintsResponse = {
      mints,
      total: total,
      page,
    };

    return NextResponse.json<MintsResponse>(response);
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
    const info = await prisma.mint.create({
      data: newMint,
    });

    return NextResponse.json({
      id: info.id,
      encoded_transaction_body: JSON.stringify({ body: "example" }),
      transaction_hash: "a49d37c2b2d964cb284d670b2c017ba9",
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create mint." },
      { status: 500 },
    );
  }
}
