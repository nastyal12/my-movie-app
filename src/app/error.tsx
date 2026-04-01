"use client";

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
        title="Oops! Something went wrong"
        description={
          error.message.includes("fetch")
            ? "Network error. Please check your internet connection."
            : error.message
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
