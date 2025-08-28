import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const fractalEngineUrl = searchParams.get("fractalEngineUrl");
  const indexerUrl = searchParams.get("indexerUrl");

  if (!fractalEngineUrl || !indexerUrl) {
    return NextResponse.json(
      { message: "Missing required parameters" },
      { status: 400 },
    );
  }

  try {
    const responseFe = await fetch(`${fractalEngineUrl}/health`);
    const responseIndexer = await fetch(`${indexerUrl}/health`);

    let status = responseFe.status;
    if (status === 200) {
      status = responseIndexer.status;
    }

    return NextResponse.json({
      status: status,
      message: responseFe.statusText,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to test connection" },
      { status: 500 },
    );
  }
}
