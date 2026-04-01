import { Movie } from "../types/movie";

interface MovieResponse {
  results: Movie[];
  total_results: number;
}

export async function getMovies(
  query: string = "return",
  page: number = 1,
): Promise<MovieResponse> {
  const apiKey = process.env.TMDB_API_KEY;
  const baseUrl = process.env.TMDB_BASE_URL;

  if (!apiKey || !baseUrl) {
    throw new Error(
      "TMDB API key or Base URL is missing in environment variables",
    );
  }

  const res = await fetch(
    `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch movies: ${res.statusText}`);
  }

  const data = await res.json();

  return {
    results: data.results as Movie[],
    total_results: data.total_results as number,
  };
}
