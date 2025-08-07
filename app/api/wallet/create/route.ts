import DogecoinJS from "@mydogeofficial/dogecoin-js";
import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { decrypt, encrypt } from "@/lib/crypto";

export async function POST(request: NextRequest) {
  try {
    const prisma = new PrismaClient();
    const count = await prisma.wallet.count();

    if (count > 0) {
      return NextResponse.json(
        { error: "Wallet already exists." },
        { status: 400 },
      );
    }

    const result = await request.json();
    const { seedPhrase, password } = result;

    if (
      seedPhrase &&
      Array.isArray(seedPhrase) &&
      seedPhrase.length === 24 &&
      password
    ) {
      const dogecoin = await DogecoinJS.DogecoinJS.init();
      const privateKey = dogecoin.getDerivedHDAddressFromMnemonic(
        0,
        0,
        "0",
        seedPhrase.join(" "),
        "",
        false,
      );

      const encryptedPrivateKey = encrypt(privateKey, password);

      await prisma.wallet.create({
        data: {
          privateKey: encryptedPrivateKey,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch wallet count." },
      { status: 500 },
    );
  }
}
