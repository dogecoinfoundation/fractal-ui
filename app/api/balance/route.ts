import { NextResponse } from "next/server";
import { type Balance, PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const walletCount = await prisma.wallet.count();
    if (walletCount === 0) {
      return NextResponse.json({ error: "Wallet not found." }, { status: 404 });
    }

    const balance = await prisma.balance.findMany();
    return NextResponse.json<Balance[]>(balance);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch balance." },
      { status: 500 },
    );
  }
}
