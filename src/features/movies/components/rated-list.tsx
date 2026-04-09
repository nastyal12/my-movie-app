"use client";

import { useEffect, useState } from "react";
import { Row, Col, Empty, Spin, message } from "antd";
import { MovieCard } from "./movie-card";
import { Movie } from "../types/movie";

export const RatedList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatedMovies = async () => {
      // 1. Берем ID сессии из localStorage
      const sessionId = localStorage.getItem("guest_session_id");

      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        // 2. Стучимся строго по адресу /api/rated
        const res = await fetch(`/api/rated?session_id=${sessionId}`);

        // Проверка: если сервер вернул не JSON, а HTML (ошибка 404/500)
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Server returned non-JSON response:", errorText);
          throw new Error("Failed to fetch rated movies");
        }

        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Rated fetch error:", error);
        message.error(
          "Could not load rated movies. Check if the API route exists.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRatedMovies();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
          width: "100%",
        }}
      >
        <Spin size="large" description="Loading your ratings..." />
      </div>
    );
  }

  return (
    <div style={{ width: "100%", maxWidth: "1000px" }}>
      <Row gutter={[32, 32]}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Col key={movie.id} xs={24} lg={12}>
              <MovieCard movie={movie} />
            </Col>
          ))
        ) : (
          <Col span={24} style={{ textAlign: "center", marginTop: "50px" }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="You haven't rated any movies yet"
            />
          </Col>
        )}
      </Row>
    </div>
  );
};
