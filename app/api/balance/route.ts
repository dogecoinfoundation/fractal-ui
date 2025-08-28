import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { GetIndexerBalance } from "@/lib/indexer-client";

const prisma = new PrismaClient();

export type Balance = {
  current: number;
};

export async function GET() {
  try {
    const wallet = await prisma.wallet.findFirst();
    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found." }, { status: 404 });
    }

    const balance = await GetIndexerBalance(wallet.address);

    return NextResponse.json<Balance[]>([balance]);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch balance." },
      { status: 500 },
    );
  }
}
