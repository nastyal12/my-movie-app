"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Genre {
  id: number;
  name: string;
}

type GenresMap = Record<number, string>;

const GenresContext = createContext<GenresMap>({});

export const GenresProvider = ({ children }: { children: React.ReactNode }) => {
  const [genres, setGenres] = useState<GenresMap>({});

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const baseUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

        if (!apiKey || !baseUrl) return;

        const res = await fetch(
          `${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`,
        );

        if (!res.ok) throw new Error("Failed to fetch genres");

        const data = await res.json();

        const genreMap = data.genres.reduce((acc: GenresMap, genre: Genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        setGenres(genreMap);
      } catch (error) {
        console.error("Error loading genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>
  );
};

export const useGenres = () => useContext(GenresContext);
