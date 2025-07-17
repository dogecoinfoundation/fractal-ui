import { type NextRequest, NextResponse } from "next/server";
import { type Mint, PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();
export async function GET() {
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
