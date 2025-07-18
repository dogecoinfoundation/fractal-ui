import { NextRequest, NextResponse } from "next/server";
import { type Balance, PrismaClient } from "@/generated/prisma";
import { FractalEngineClient } from "@/app/client/client";

const prisma = new PrismaClient();
const client = new FractalEngineClient();

export async function POST(request: NextRequest) {
  const response = await client.setupDemoBalance();

  const walletConfig = await prisma.walletConfig.create({
    data: {
      private_key: response.private_key,
      address: response.address,
      label: response.label,
      public_key: response.public_key,
    },
  });

  return NextResponse.json(walletConfig);
}
