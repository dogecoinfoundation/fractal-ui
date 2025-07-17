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
    const configRow = await request.json();
    const { id, key, value } = configRow;

    const info = await prisma.config.upsert({
      where: { key },
      update: { value },
      create: { id, key, value },
    });

    return NextResponse.json({
      id: info.id,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create config." },
      { status: 500 },
    );
  }
}
