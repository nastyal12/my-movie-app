import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.TMDB_BASE_URL}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`,
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch genres" },
      { status: 500 },
    );
  }
}
