import { NextResponse } from "next/server";
import { getDatabase } from "@/app/database";

export type Balance = {
  id: number;
  currency: string;
  symbol: string;
  value: number;
};

const db = getDatabase();

export async function GET() {
  try {
    const balance = db.prepare("SELECT * FROM balance").all() as Balance[];
    return NextResponse.json<Balance[]>(balance);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch balance." },
      { status: 500 },
    );
  }
}
