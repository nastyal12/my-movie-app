"use client";

import { Row, Col, Empty, Spin } from "antd";
import { MovieCard } from "./movie-card";
import { Movie } from "../types/movie";

interface MovieListProps {
  movies: Movie[];
  loading?: boolean;
}

export const MovieList = ({ movies, loading }: MovieListProps) => {
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <Spin size="large" tip="Loading movies..." />
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <Empty description="No movies found" style={{ marginTop: "100px" }} />
    );
  }

  return (
    <Row gutter={[32, 32]} style={{ marginTop: "20px" }}>
      {movies.map((movie) => (
        <Col key={movie.id} xs={24} lg={12}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
};
