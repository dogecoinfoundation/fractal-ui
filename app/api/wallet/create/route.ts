import km2, { Crypto, Net } from "@houseofdoge/km2";
import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { encrypt } from "@/lib/crypto";

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
      using seed = km2.SeedPhrase.from({ mnemonic: seedPhrase.join(" ") });
      using wallet = new km2.Wallet(seed, {
        cryptocurrency: Crypto.Dogecoin,
        network: Net.Mainnet,
      });
      using kp = wallet.deriveKeypair({ account: 1, change: 0, index: 0 });

      const encryptedPrivateKey = encrypt(kp.privateKey, password);

      await prisma.wallet.create({
        data: {
          privateKey: encryptedPrivateKey,
          address: kp.address,
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
