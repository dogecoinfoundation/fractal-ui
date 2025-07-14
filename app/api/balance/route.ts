import { NextResponse } from "next/server";
import { getAllRows } from "@/app/database";

export type Balance = {
  id: number;
  currency: string;
  symbol: string;
  value: number;
};

export async function GET() {
  try {
    const balance = getAllRows("balance") as Balance[];
    return NextResponse.json<Balance[]>(balance);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch balance." },
      { status: 500 },
    );
  }
}
