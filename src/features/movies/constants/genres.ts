export const getGenres = async () => {
  const baseUrl = process.env.TMDB_BASE_URL;
  const apiKey = process.env.TMDB_API_KEY;

  const res = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);

  if (!res.ok) {
    throw new Error("Failed to fetch genres");
  }

  const data = await res.json();

  return data.genres.reduce(
    (acc: Record<number, string>, genre: { id: number; name: string }) => {
      acc[genre.id] = genre.name;
      return acc;
    },
    {},
  );
};
