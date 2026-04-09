export const getGuestSession = async () => {
  const res = await fetch(
    `${process.env.TMDB_BASE_URL}/authentication/guest_session/new?api_key=${process.env.TMDB_API_KEY}`,
  );
  const data = await res.json();
  return data.guest_session_id;
};
