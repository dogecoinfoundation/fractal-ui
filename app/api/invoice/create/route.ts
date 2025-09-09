import { CreateInvoice } from "@/lib/fractal-engine-client";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const newInvoice = await request.json();

    const res = await CreateInvoice(newInvoice);

    return NextResponse.json({
      transaction_hash: res,
    });
  } catch (error) {
    console.error("Error in invoice POST:", error);
    return NextResponse.json(
      { error: "Failed to process invoice request" },
      { status: 500 },
    );
  }
}
