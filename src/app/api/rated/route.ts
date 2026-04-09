import { NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL;

// GET: Получаем список оцененных фильмов
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) return NextResponse.json({ results: [] });

  try {
    const res = await fetch(
      `${BASE_URL}/guest_session/${sessionId}/rated/movies?api_key=${API_KEY}&sort_by=created_at.desc`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Fetch error" }, { status: 500 });
  }
}

// POST: Сохраняем оценку из звезд
export async function POST(request: Request) {
  try {
    const { movieId, rating, sessionId } = await request.json();

    const res = await fetch(
      `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${sessionId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({ value: rating }),
      },
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Post error" }, { status: 500 });
  }
}
