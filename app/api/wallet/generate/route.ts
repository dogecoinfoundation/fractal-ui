import km2, { Language } from "@houseofdoge/km2";
import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export async function POST() {
  try {
    const prisma = new PrismaClient();

    using seed = new km2.SeedPhrase({
      wordCount: 24,
      language: Language.English,
    });
    return NextResponse.json<{ seedPhrase: string }>({
      seedPhrase: seed.phrase,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate wallet." },
      { status: 500 },
    );
  }
}
