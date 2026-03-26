import { Movie } from "../types/movie";

export async function getMovies(): Promise<Movie[]> {
  const apiKey = process.env.TMDB_API_KEY;
  const baseUrl = process.env.TMDB_BASE_URL;

  if (!apiKey || !baseUrl) {
    throw new Error(
      "TMDB API key or Base URL is missing in environment variables",
    );
  }

  const res = await fetch(
    `${baseUrl}/search/movie?api_key=${apiKey}&query=return`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch movies: ${res.statusText}`);
  }

  const data = await res.json();
  return data.results as Movie[];
}
