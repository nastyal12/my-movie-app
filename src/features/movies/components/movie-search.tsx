"use client";

import { Input } from "antd";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import debounce from "lodash/debounce";

export const MovieSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState(searchParams.get("query") || "");

  const debouncedPush = useMemo(
    () =>
      debounce((term: string) => {
        const params = new URLSearchParams(window.location.search);
        if (term) {
          params.set("query", term);
        } else {
          params.delete("query");
        }
        params.set("page", "1"); // При новом поиске всегда на 1 страницу
        router.push(`${pathname}?${params.toString()}`);
      }, 500),
    [pathname, router],
  );

  useEffect(() => {
    return () => debouncedPush.cancel();
  }, [debouncedPush]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    debouncedPush(val);
  };

  return (
    <Input
      placeholder="Type to search movies..."
      value={inputValue}
      onChange={onChange}
      allowClear
      style={{ marginBottom: "20px", maxWidth: "1000px", height: "40px" }}
    />
  );
};
