import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import { GenresProvider } from "@/context/genres-context";
import { SessionInitializer } from "@/features/movies/components/session-initializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Search App",
  description: "Search and rate your favorite movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <GenresProvider>
            <SessionInitializer />
            <main
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 20px",
              }}
            >
              {children}
            </main>
          </GenresProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
