"use client";

import { Input } from "antd";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import debounce from "lodash/debounce";

export const MovieSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("query") || "");
  const isInitialMount = useRef(true);

  useEffect(() => {
    const handler = debounce((term: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }

      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }

      params.set("page", "1");

      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    handler(value);

    return () => {
      handler.cancel();
    };
  }, [value, pathname, router, searchParams]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    isInitialMount.current = false;
  };

  return (
    <Input
      placeholder="Type to search movies..."
      value={value}
      onChange={onChange}
      style={{ marginBottom: "20px", maxWidth: "1000px", height: "40px" }}
      allowClear
    />
  );
};
