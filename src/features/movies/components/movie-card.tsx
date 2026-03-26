import { Card, Tag } from "antd";
import { format } from "date-fns";
import { truncateText } from "@/lib/utils";
import { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Card
      hoverable
      styles={{ body: { padding: 0, display: "flex", height: "280px" } }}
      style={{ overflow: "hidden" }}
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Poster"
        }
        alt={movie.title}
        style={{ width: "180px", height: "100%", objectFit: "cover" }}
      />

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
          <div className="rating-circle">
            {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
          </div>
        </div>

        <p style={{ color: "#999", fontSize: "12px", margin: "5px 0" }}>
          {movie.release_date
            ? format(new Date(movie.release_date), "MMMM d, yyyy")
            : "Release date unknown"}
        </p>

        <div style={{ margin: "10px 0" }}>
          <Tag>Action</Tag>
          <Tag>Drama</Tag>
        </div>

        <p style={{ fontSize: "13px", lineHeight: "1.4" }}>
          {truncateText(movie.overview, 140)}
        </p>
      </div>
    </Card>
  );
};
