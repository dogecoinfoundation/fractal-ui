import { readFileSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { type NextRequest, NextResponse } from "next/server";

export type Mint = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  metadata: Record<string, string>;
  fraction_count: number;
  hash: string;
  feed_url: string;
  block_height: number;
  tags: string[];
  transaction_hash?: string;
};

export type ApiMint = Mint & {
  metadata: string;
  tags: string;
};

const dbPath = path.join(process.cwd(), "database.sqlite");
const db = new Database(dbPath);

export async function GET() {
  try {
    const mints = db.prepare("SELECT * FROM mints").all();
    return NextResponse.json(mints);
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
    const {
      title,
      description,
      metadata,
      fraction_count,
      hash,
      feed_url,
      block_height,
      tags,
      transaction_hash,
    } = await request.json();

    const statement = db.prepare(
      "INSERT INTO mints (title, description, metadata, fraction_count, hash, feed_url, block_height, tags, transaction_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    );
    statement.run(
      title,
      description,
      JSON.stringify(metadata),
      fraction_count,
      hash,
      feed_url,
      block_height,
      JSON.stringify(tags),
      transaction_hash,
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create mint." },
      { status: 500 },
    );
  }
}
