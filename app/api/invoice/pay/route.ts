import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Pay invoice request received:", body);

    return NextResponse.json(
      { message: "Pay invoice endpoint not yet implemented" },
      { status: 501 },
    );
  } catch (error) {
    console.error("Error in invoice POST:", error);
    return NextResponse.json(
      { error: "Failed to process invoice request" },
      { status: 500 },
    );
  }
}
