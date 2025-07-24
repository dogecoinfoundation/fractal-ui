import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const configKey = searchParams.get("configKey");

    if (configKey) {
      const rows = await prisma.config.findMany({
        where: { key: { startsWith: configKey } },
      });

      return NextResponse.json(rows);
    } else {
      const rows = await prisma.config.findMany();
      return NextResponse.json(rows);
    }
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
    const result = await request.json();
    const configRows = Array.isArray(result) ? result : [result];

    const promises = [];

    for (const row of configRows) {
      const { id, key, value } = row;
      promises.push(
        prisma.config.upsert({
          where: { key },
          update: { value },
          create: { id, key, value },
        }),
      );
    }
    await Promise.all(promises);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create config." },
      { status: 500 },
    );
  }
}
