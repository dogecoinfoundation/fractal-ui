import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const wallet = await prisma.wallet.findFirst({ where: { active: true } });
    return NextResponse.json({
      address: wallet?.address,
      active: wallet?.active,
      name: wallet?.name,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch wallet count." },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const result = await request.json();
    const { name } = result;

    await prisma.wallet.updateMany({
      data: {
        active: false,
      },
    });

    await prisma.wallet.update({
      where: { name: name },
      data: {
        active: true,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch wallet count." },
      { status: 500 },
    );
  }
}
