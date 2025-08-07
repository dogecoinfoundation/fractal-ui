import DogecoinJS from "@mydogeofficial/dogecoin-js";
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

    const dogecoin = await DogecoinJS.DogecoinJS.init();
    const seedPhrase = dogecoin.generateRandomEnglishMnemonic("256");
    return NextResponse.json<{ seedPhrase: string }>({ seedPhrase });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate wallet." },
      { status: 500 },
    );
  }
}
