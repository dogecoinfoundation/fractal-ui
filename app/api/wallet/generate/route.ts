import km2, { Language } from "@houseofdogeinc/km2";
import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export async function POST() {
  try {
    const prisma = new PrismaClient();
    const count = await prisma.wallet.count();

    if (count > 0) {
      return NextResponse.json(
        { error: "Wallet already exists." },
        { status: 400 },
      );
    }

    const seed = new km2.SeedPhrase({
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
