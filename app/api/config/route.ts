import { type NextRequest, NextResponse } from "next/server";
import { getAllRows, getDatabase, getRowByColumnValue } from "@/app/database";

export const ConfigKeys = ["timezone", "connection"] as const;

export type ConfigRow = {
  id: number;
  key: (typeof ConfigKeys)[number];
  value: string;
};

const db = getDatabase();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const configKey = searchParams.get("configKey");
    let config: ConfigRow | ConfigRow[];

    if (configKey) {
      config =
        (getRowByColumnValue("config", "key", configKey) as ConfigRow) || [];
    } else {
      config = getAllRows("config") as ConfigRow[];
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch config." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const configRow = await request.json();
    const { id, key, value } = configRow;

    const statement = db.prepare(
      `
      INSERT INTO config (id, key, value)
      VALUES (?, ?, ?) ON CONFLICT(key)
      DO UPDATE SET value = excluded.value;
      `,
    );
    const info = statement.run(id, key, value);

    return NextResponse.json({
      id: info.lastInsertRowid,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create config." },
      { status: 500 },
    );
  }
}
