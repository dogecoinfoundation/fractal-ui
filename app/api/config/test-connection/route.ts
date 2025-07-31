import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const host = searchParams.get("host");
  const port = searchParams.get("port");
  const authenticationToken = searchParams.get("authenticationToken");

  if (!host || !port) {
    return NextResponse.json(
      { message: "Missing required parameters" },
      { status: 400 },
    );
  }

  try {
    const options =
      authenticationToken && authenticationToken !== ""
        ? {
            headers: {
              Authorization: `Bearer ${authenticationToken}`,
            },
          }
        : {};
    const response = await fetch(`http://${host}:${port}`, options);

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
