import path from "node:path";
import Database from "better-sqlite3";
import { NextResponse } from "next/server";

export type Balance = {
  id: number;
  currency: string;
  symbol: string;
  value: number;
};

const dbPath = path.join(process.cwd(), "database.sqlite");
const db = new Database(dbPath);

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
