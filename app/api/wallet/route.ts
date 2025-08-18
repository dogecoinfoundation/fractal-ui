import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const wallet = await prisma.wallet.findFirst();
    return NextResponse.json({ address: wallet?.address });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch wallet count." },
      { status: 500 },
    );
  }
}
