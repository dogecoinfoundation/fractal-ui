import { type NextRequest, NextResponse } from "next/server";
import { type Mint, PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (address) {
    // TODO: Replace with a call to Fractal Engine's API
    // i.e. fetch GET /api/mints?address=ADDRESS

    const mintsCount = await prisma.mint.count();
    const skip = Math.floor(Math.random() * mintsCount);
    const mints = await prisma.mint.findMany({
      take: 5,
      skip: skip,
    });

    return NextResponse.json<Mint[]>(mints);
  }

  try {
    const mints = await prisma.mint.findMany();

    return NextResponse.json<Mint[]>(mints);
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
