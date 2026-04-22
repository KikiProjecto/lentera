import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Lentera - GameFi Anti Judi Online",
  description: "Jaga Masa Depanmu dari Godaan Digital - Main, Belajar, Menang Bareng Karakter Lucu!",
  keywords: ["GameFi", "Solana", "Anti Judi", "Edutainment", "Financial Literacy"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}