import { type NextRequest, NextResponse } from "next/server";
import { type Mint, PrismaClient } from "@/generated/prisma";
import { FractalEngineClient } from "@/app/client/client";
import { signPayload } from "@/lib/signing";

const prisma = new PrismaClient();
const client = new FractalEngineClient();

export async function GET() {
  try {
    const mints = await prisma.mint.findMany();

    return NextResponse.json<Mint[]>(mints);
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

    const newMint = await request.json();

    const walletConfig = await prisma.walletConfig.findFirstOrThrow();

    const payload = {
      title: newMint.title,
      description: newMint.description,
      fraction_count: newMint.fraction_count,
      tags: newMint.tags,
      metadata: newMint.metadata,
      requirements: newMint.requirements,
      lockup_options: newMint.lockup_options,
      feed_url: newMint.feed_url,
      owner_address: newMint.owner_address,
    } as any;

    const mintResponse = await client.createMint({
      payload: payload,
      address: walletConfig.address,
      public_key: walletConfig.public_key,
    });


    await prisma.mint.create({
      data: {
        id: mintResponse.transaction_id,
        title: newMint.title,
        description: newMint.description,
        metadata: newMint.metadata,
        fraction_count: newMint.fraction_count,
        feed_url: newMint.feed_url,
        hash: mintResponse.hash,
        block_height: mintResponse.block_height,
        transaction_hash: mintResponse.transaction_hash,
        created_at: new Date(),
      },
    });


    return NextResponse.json({
      transaction_id: mintResponse.transaction_id,
    });
  } catch (error) {
    console.error("Error:", error);
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create mint." },
      { status: 500 },
    );
  }
}
