"use client";

import { Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const MovieSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentQuery = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState(currentQuery);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (inputValue !== currentQuery) {
        const params = new URLSearchParams(searchParams.toString());

        if (inputValue) {
          params.set("query", inputValue);
        } else {
          params.delete("query");
        }
        params.set("page", "1"); // Сбрасываем на 1 страницу при новом поиске

        router.push(`?${params.toString()}`);
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, router, searchParams, currentQuery]);

  return (
    <div style={{ marginBottom: "20px", width: "100%", maxWidth: "1000px" }}>
      <Input
        placeholder="Type to search..."
        size="large"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};
