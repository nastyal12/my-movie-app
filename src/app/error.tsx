"use client"; // Обязательно! Файлы ошибок должны быть клиентскими.

import { Alert, Button } from "antd";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Captured error:", error);
  }, [error]);

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <Alert
        message="Oops! Something went wrong"
        description={
          error.message.includes("fetch")
            ? "ou're offline. Please check your internet connection."
            : "We couldn't load the movies. Please try again later."
        }
        type="error"
        showIcon
      />
      <Button
        type="primary"
        onClick={() => reset()}
        style={{ marginTop: "20px" }}
      >
        Try Again
      </Button>
    </div>
  );
}
