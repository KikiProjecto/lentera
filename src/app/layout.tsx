import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Lentera - GameFi Anti Judi Online",
  description: "Jaga Masa Depanmu dari Godaan Digital - Main, Belajar, Menang Bareng Karakter Lucu!",
  keywords: ["GameFi", "Solana", "Anti Judi", "Edutainment", "Financial Literacy"],
  authors: [{ name: "Lentera Team" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Lentera",
  },
  openGraph: {
    title: "Lentera - GameFi Anti Judi Online",
    description: "GameFi Edutainment untuk Literasi Keuangan & Pencegahan Judi Online",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body className="bg-dark-950 text-light-100 antialiased">
        <Providers>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}