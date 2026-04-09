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
        const params = new URLSearchParams(searchParams.toString());
        if (term) {
          params.set("query", term);
        } else {
          params.delete("query");
        }
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }, 600),
    [pathname, router, searchParams],
  );

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
      size="large"
      style={{ marginBottom: "20px", maxWidth: "1000px" }}
    />
  );
};
