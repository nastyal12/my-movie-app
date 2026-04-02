export const createGuestSession = async () => {
  const apiKey = process.env.TMDB_API_KEY;
  const baseUrl = process.env.TMDB_BASE_URL;

  const res = await fetch(
    `${baseUrl}/authentication/guest_session/new?api_key=${apiKey}`,
  );
  const data = await res.json();

  if (data.success) {
    localStorage.setItem("guest_session_id", data.guest_session_id);
    return data.guest_session_id;
  }
  return null;
};
