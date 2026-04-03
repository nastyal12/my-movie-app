"use client";
import { Card, Tag, Rate } from "antd";
import { format } from "date-fns";
import { truncateText } from "@/lib/utils";
import { Movie } from "../types/movie";
import { useGenres } from "@/context/genres-context";
import Image from "next/image";

interface MovieCardProps {
  movie: Movie;
}

const getRatingColor = (rating: number): string => {
  if (rating >= 0 && rating < 3) return "#E90000";
  if (rating >= 3 && rating < 5) return "#E97E00";
  if (rating >= 5 && rating < 7) return "#E9D100";
  return "#66E900";
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  const allGenres = useGenres();
  const rating = movie.vote_average || 0;
  const ratingColor = getRatingColor(rating);

  return (
    <Card
      hoverable
      styles={{ body: { padding: 0, display: "flex", height: "280px" } }}
      style={{ overflow: "hidden", position: "relative" }}
    >
      <Image
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "https://placehold.jp/200x300.png"
        }
        alt={movie.title}
        width={180}
        height={280}
        style={{ objectFit: "cover" }}
      />

      <div
        style={{
          padding: "20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
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

          {/* Динамический круг рейтинга */}
          <div className="rating-circle" style={{ borderColor: ratingColor }}>
            {rating.toFixed(1)}
          </div>
        </div>

        <p style={{ color: "#999", fontSize: "12px", margin: "5px 0 10px 0" }}>
          {movie.release_date
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
              {allGenres[id] || "Genre"}
            </Tag>
          ))}
        </div>

        <p style={{ fontSize: "13px", lineHeight: "1.4", flexGrow: 1 }}>
          {truncateText(movie.overview, 140)}
        </p>

        <div style={{ marginTop: "auto", paddingTop: "10px" }}>
          <Rate
            count={10}
            allowHalf
            defaultValue={movie.rating || 0}
            style={{ fontSize: "14px" }}
            onChange={(val) => {
              console.log(`Movie ${movie.id} rated: ${val}`);
            }}
          />
        </div>
      </div>
    </Card>
  );
};
