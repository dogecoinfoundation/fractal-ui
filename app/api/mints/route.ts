import { type NextRequest, NextResponse } from "next/server";
import { getAllRows, getDatabase } from "@/app/database";

export type Mint = {
  id: number | bigint;
  title: string;
  description: string;
  created_at: string;
  metadata: Record<string, string | number>;
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

export type NewMint = Pick<
  Mint,
  "title" | "description" | "metadata" | "fraction_count" | "feed_url" | "tags"
>;

type MintResponse = Pick<Mint, "id" | "transaction_hash"> & {
  encoded_transaction_body: string;
};

const mapApiMintsToMints = (data: ApiMint[]): Mint[] => {
  return data.map((mint) => ({
    ...mint,
    tags: JSON.parse(mint.tags),
    metadata: JSON.parse(mint.metadata),
  }));
};

const db = getDatabase();

export async function GET() {
  try {
    const mints = getAllRows("mints") as ApiMint[];
    return NextResponse.json<Mint[]>(mapApiMintsToMints(mints));
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
    const newMint: NewMint = await request.json();
    const { title, description, metadata, fraction_count, feed_url, tags } =
      newMint;

    const statement = db.prepare(
      "INSERT INTO mints (title, description, metadata, fraction_count, feed_url, tags) VALUES (?, ?, ?, ?, ?, ?)",
    );
    const info = statement.run(
      title,
      description,
      JSON.stringify(metadata),
      fraction_count,
      feed_url,
      JSON.stringify(tags),
    );

    return NextResponse.json<MintResponse>({
      id: info.lastInsertRowid,
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
