import { Card, Col, Row, Tag, Tabs, Pagination } from "antd";
import { format } from "date-fns";
// Убедись, что путь правильный (после переноса папки lib в src)
import { truncateText } from "@/lib/utils";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string | null;
  vote_average: number; // Добавили рейтинг в интерфейс
}

async function getMovies() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

  const res = await fetch(
    `${baseUrl}/search/movie?api_key=${apiKey}&query=return`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  return data.results as Movie[];
}

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
      {/* 1. Вкладки (Tabs) */}
      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          { label: "Search", key: "1" },
          { label: "Rated", key: "2" },
        ]}
        style={{ marginBottom: "20px" }}
      />

      {/* 2. Сетка с карточками */}
      <Row gutter={[32, 32]} style={{ width: "100%", maxWidth: "1000px" }}>
        {movies.map((movie) => (
          <Col key={movie.id} xs={24} lg={12}>
            <Card
              hoverable
              styles={{
                body: { padding: 0, display: "flex", height: "280px" },
              }}
              style={{ overflow: "hidden" }}
            >
              {/* Левая часть: Постер */}
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Poster"
                }
                alt={movie.title}
                style={{ width: "180px", height: "100%", objectFit: "cover" }}
              />

              {/* Правая часть: Описание */}
              <div
                style={{
                  padding: "20px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <h3 style={{ fontSize: "18px", margin: 0, maxWidth: "80%" }}>
                    {movie.title}
                  </h3>
                  {/* Кружочек рейтинга */}
                  <div className="rating-circle">
                    {movie.vote_average.toFixed(1)}
                  </div>
                </div>

                {/* Динамическая дата */}
                <p style={{ color: "#999", fontSize: "12px", margin: "5px 0" }}>
                  {movie.release_date
                    ? format(new Date(movie.release_date), "MMMM d, yyyy")
                    : "Release date unknown"}
                </p>

                <div style={{ margin: "10px 0" }}>
                  <Tag>Action</Tag>
                  <Tag>Drama</Tag>
                </div>

                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.4",
                    overflow: "hidden",
                  }}
                >
                  {truncateText(movie.overview, 150)}
                </p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 3. Пагинация */}
      <Pagination
        defaultCurrent={1}
        total={50}
        style={{ marginTop: "40px", marginBottom: "20px" }}
        showSizeChanger={false}
      />
    </div>
  );
}
