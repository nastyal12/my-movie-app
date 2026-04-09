"use client";
import { useEffect } from "react";

export const SessionInitializer = () => {
  useEffect(() => {
    const initSession = async () => {
      if (localStorage.getItem("guest_session_id")) return;

      try {
        const res = await fetch("/api/session");

        if (!res.ok)
          throw new Error("Failed to fetch session from internal API");

        const data = await res.json();

        if (data.guest_session_id) {
          localStorage.setItem("guest_session_id", data.guest_session_id);
          console.log("Success!");
        }
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };

    initSession();
  }, []);

  return null;
};
