"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const GenresContext = createContext<{ genres: Record<number, string> }>({
  genres: {},
});

export const GenresProvider = ({ children }: { children: React.ReactNode }) => {
  const [genres, setGenres] = useState<Record<number, string>>({});

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const res = await fetch("/api/genres"); // Путь к твоему новому роуту
        const data = await res.json();

        if (data.genres) {
          const map: Record<number, string> = {};
          data.genres.forEach((g: { id: number; name: string }) => {
            map[g.id] = g.name;
          });
          setGenres(map);
        }
      } catch (e) {
        console.error("Ошибка загрузки жанров:", e);
      }
    };
    loadGenres();
  }, []);

  return (
    <GenresContext.Provider value={{ genres }}>
      {children}
    </GenresContext.Provider>
  );
};

export const useGenres = () => useContext(GenresContext);
