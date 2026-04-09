import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.TMDB_BASE_URL}/authentication/guest_session/new?api_key=${process.env.TMDB_API_KEY}`,
    );

    if (!res.ok) throw new Error("TMDB Error");

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 },
    );
  }
}
