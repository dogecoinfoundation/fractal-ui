import { NextRequest, NextResponse } from "next/server";
import { type Balance, PrismaClient } from "@/generated/prisma";
import { FractalEngineClient } from "@/app/client/client";

const prisma = new PrismaClient();
const client = new FractalEngineClient();

export async function GET() {
  try {
    const walletConfig = await prisma.walletConfig.findFirst();

    if (!walletConfig) {
      return NextResponse.json<Balance[]>([]);
    }
    
    const unspent = await client.listUnspent(walletConfig.address);
    const balance = unspent.reduce((acc: number, unspent: any) => {
      if (unspent.spendable) {
        return acc + unspent.amount;
      } else {
        return acc;
      }
    }, 0);
 
   
    return NextResponse.json<Balance[]>([
      {
        symbol: "DOGE",
        id: walletConfig.address,
        currency: "DOGE",
        value: balance,
      }
    ]);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch balance." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const response = await client.setupDemoBalance();
  return NextResponse.json(response);
}
