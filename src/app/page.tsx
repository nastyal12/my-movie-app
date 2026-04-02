import { Col, Row } from "antd";
import { getMovies } from "@/features/movies/api/get-movies";
import { MovieCard } from "@/features/movies/components/movie-card";
import { MoviePagination } from "@/features/movies/components/movie-pagination";
import { MovieSearch } from "@/features/movies/components/movie-search";
import { RedirectToTab } from "@/features/movies/components/movie-tabs";

export default async function MoviePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; tab?: string; query?: string }>;
}) {
  const params = await searchParams;
  const activeTab = params.tab || "search";
  const page = Number(params.page) || 1;
  const query = params.query || "return";

  const { results, total_results } =
    activeTab === "search"
      ? await getMovies(query, page)
      : { results: [], total_results: 0 };

  return (
    <div
      key={JSON.stringify(params)}
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <RedirectToTab activeTab={activeTab} />

      {activeTab === "search" && <MovieSearch />}

      <Row
        gutter={[32, 32]}
        style={{
          width: "100%",
          maxWidth: "1000px",
          flex: 1,
          marginTop: "20px",
        }}
      >
        {results && results.length > 0 ? (
          results.map((movie) => (
            <Col key={movie.id} xs={24} lg={12}>
              <MovieCard movie={movie} />
            </Col>
          ))
        ) : (
          <Col span={24} style={{ textAlign: "center", marginTop: "50px" }}>
            <h3>
              {activeTab === "search"
                ? `No movies found for "${query}"`
                : "You haven't rated any movies yet."}
            </h3>
          </Col>
        )}
      </Row>

      {total_results > 0 && (
        <div style={{ marginTop: "40px" }}>
          <MoviePagination
            total={total_results > 10000 ? 10000 : total_results}
          />
        </div>
      )}
    </div>
  );
}
