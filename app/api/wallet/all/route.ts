import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const wallets = await prisma.wallet.findMany();
    return NextResponse.json(
      wallets.map((wallet) => ({
        address: wallet.address,
        name: wallet.name,
        active: wallet.active,
      })),
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch wallet count." },
      { status: 500 },
    );
  }
}
