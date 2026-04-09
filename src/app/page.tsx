import { Col, Row, Empty } from "antd";
import { getMovies } from "./api/get-movies";
import { MovieCard } from "@/features/movies/components/movie-card";
import { MoviePagination } from "@/features/movies/components/movie-pagination";
import { MovieSearch } from "@/features/movies/components/movie-search";
import { RedirectToTab } from "@/features/movies/components/movie-tabs";
import { RatedList } from "@/features/movies/components/rated-list";
import { Movie } from "@/features/movies/types/movie";

export default async function MoviePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; tab?: string; query?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const activeTab = params.tab || "search";
  const query = params.query || "";

  let searchResults: Movie[] = [];
  let totalResults = 0;

  if (activeTab === "search") {
    const data = await getMovies(query || "return", page);
    searchResults = data.results || [];
    totalResults = data.total_results || 0;
  }

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <RedirectToTab activeTab={activeTab} />

      {/* Поиск показываем только если вкладка search */}
      {activeTab === "search" && (
        <div
          style={{ width: "100%", maxWidth: "1000px", marginBottom: "20px" }}
        >
          <MovieSearch />
        </div>
      )}

      {activeTab === "search" ? (
        <>
          <Row gutter={[32, 32]} style={{ width: "100%", maxWidth: "1000px" }}>
            {searchResults.map((m) => (
              <Col key={m.id} xs={24} lg={12}>
                <MovieCard movie={m} />
              </Col>
            ))}
          </Row>
          {totalResults > 0 && (
            <div style={{ marginTop: "40px" }}>
              <MoviePagination
                total={totalResults > 10000 ? 10000 : totalResults}
              />
            </div>
          )}
        </>
      ) : (
        /* На вкладке Rated рендерим только список без поиска и пагинации */
        <RatedList />
      )}
    </div>
  );
}
