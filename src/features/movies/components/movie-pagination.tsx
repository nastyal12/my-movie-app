"use client";

import { Pagination } from "antd";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const MoviePagination = ({ total }: { total: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const handleChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    const query = searchParams.get("query");
    if (query) params.set("query", query);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      current={currentPage}
      total={total}
      pageSize={20}
      onChange={handleChange}
      showSizeChanger={false}
      style={{ marginTop: "40px", marginBottom: "20px" }}
    />
  );
};
