"use client";

import { Card, Tag, Rate, message } from "antd";
import { format } from "date-fns";
import { truncateText } from "@/lib/utils";
import { Movie } from "../types/movie";
import { useGenres } from "@/context/genres-context";
import Image from "next/image";

interface MovieCardProps {
  movie: Movie;
}

interface GenresContextData {
  genres: Record<number, string>;
  isLoading: boolean;
}

const getRatingColor = (rating: number): string => {
  if (rating >= 0 && rating < 3) return "#E90000";
  if (rating >= 3 && rating < 5) return "#E97E00";
  if (rating >= 5 && rating < 7) return "#E9D100";
  return "#66E900";
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { genres } = useGenres() as unknown as GenresContextData;

  const rating = movie.vote_average || 0;
  const ratingColor = getRatingColor(rating);

  const handleRate = async (val: number) => {
    const sessionId = localStorage.getItem("guest_session_id");
    if (!sessionId) {
      message.error("Guest session not initialized");
      return;
    }

    try {
      const res = await fetch("/api/rated", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId: movie.id,
          rating: val,
          sessionId: sessionId,
        }),
      });

      if (res.ok) {
        message.success(`You rated "${movie.title}" ${val} stars!`);
      } else {
        message.error("Failed to submit rating");
      }
    } catch (error) {
      console.error("Error rating movie:", error);
    }
  };

  return (
    <Card
      hoverable
      styles={{ body: { padding: 0, display: "flex", height: "280px" } }}
      style={{ overflow: "hidden", position: "relative", marginBottom: "20px" }}
    >
      <div
        style={{
          width: "180px",
          height: "280px",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <Image
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
              : "https://placehold.jp/200x300.png"
          }
          alt={movie.title}
          fill
          sizes="180px"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div
        style={{
          padding: "20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minWidth: 0,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                margin: 0,
                maxWidth: "80%",
                lineHeight: 1.2,
              }}
            >
              {movie.title}
            </h3>
            <div
              className="rating-circle"
              style={{ borderColor: ratingColor, flexShrink: 0 }}
            >
              {rating.toFixed(1)}
            </div>
          </div>

          <p style={{ color: "#999", fontSize: "12px", margin: "5px 0" }}>
            {movie.release_date && !isNaN(Date.parse(movie.release_date))
              ? format(new Date(movie.release_date), "MMMM d, yyyy")
              : "Release date unknown"}
          </p>

          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              flexWrap: "wrap",
              gap: "4px",
            }}
          >
            {movie.genre_ids?.map((id) => (
              <Tag key={id} style={{ margin: 0 }}>
                {genres?.[id] ?? "Genre"}
              </Tag>
            ))}
          </div>

          <p style={{ fontSize: "13px", lineHeight: "1.4" }}>
            {truncateText(movie.overview, 140)}
          </p>
        </div>

        <div style={{ paddingTop: "10px" }}>
          <Rate
            count={10}
            allowHalf
            defaultValue={movie.rating || 0}
            style={{ fontSize: "15px" }}
            onChange={handleRate}
          />
        </div>
      </div>
    </Card>
  );
};
