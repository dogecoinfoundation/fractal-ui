import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { type MintsResponse, PAGE_SIZE } from "@/lib/definitions";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const page = Number(searchParams.get("page")) || 1;

  try {
    const total = await prisma.mint.count();

    if (address) {
      // TODO: Replace with a call to Fractal Engine's API
      // i.e. fetch GET /api/mints?address=ADDRESS
      const skip = Math.floor(Math.random() * total);
      const mints = await prisma.mint.findMany({
        take: PAGE_SIZE,
        skip: skip,
      });
      const response: MintsResponse = {
        mints,
        total: PAGE_SIZE,
        page,
      };

      return NextResponse.json<MintsResponse>(response);
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
