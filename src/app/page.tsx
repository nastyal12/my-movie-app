import { Col, Row, Tabs, Pagination } from "antd";
import { getMovies } from "@/features/movies/api/get-movies";
import { MovieCard } from "@/features/movies/components/movie-card";

export default async function MoviePage() {
  const movies = await getMovies();

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          { label: "Search", key: "1" },
          { label: "Rated", key: "2" },
        ]}
        style={{ marginBottom: "20px" }}
      />

      <Row gutter={[32, 32]} style={{ width: "100%", maxWidth: "1000px" }}>
        {movies.map((movie) => (
          <Col key={movie.id} xs={24} lg={12}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>

      <Pagination
        defaultCurrent={1}
        total={50}
        style={{ marginTop: "40px", marginBottom: "20px" }}
        showSizeChanger={false}
      />
    </div>
  );
}
