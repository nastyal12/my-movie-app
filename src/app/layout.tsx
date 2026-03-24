import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Search App",
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
          {/* Контент страницы (page.tsx) вставится сюда */}
          <main style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {children}
          </main>
        </AntdRegistry>
      </body>
    </html>
  );
}
