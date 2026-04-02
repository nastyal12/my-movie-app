"use client";

import { Tabs } from "antd";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface RedirectToTabProps {
  activeTab: string;
}

export const RedirectToTab = ({ activeTab }: RedirectToTabProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("tab", key);

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  const items = [
    {
      key: "search",
      label: "Search",
    },
    {
      key: "rated",
      label: "Rated",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      <Tabs
        activeKey={activeTab}
        onChange={handleChange}
        centered
        items={items}
        tabBarStyle={{ marginBottom: 0 }}
      />
    </div>
  );
};
