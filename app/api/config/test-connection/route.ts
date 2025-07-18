import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const host = searchParams.get("host");
  const port = searchParams.get("port");
  const token = searchParams.get("token");

  if (!host || !port || !token) {
    return NextResponse.json(
      { message: "Missing required parameters" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`http://${host}:${port}/health`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const health = await response.json();

    if (health.wallets_enabled == false) {
      return NextResponse.json({
        status: 400,
        message: "Wallets are not enabled",
      });
    }

    return NextResponse.json({
      status: response.status,
      message: response.statusText,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to test connection" },
      { status: 500 },
    );
  }
}
