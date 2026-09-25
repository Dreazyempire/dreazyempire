import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dreazy Empire | Graphic Designer & Visual Content Creator",
  description:
    "Dreazy Empire — graphic design and visual content for Web3, digital brands, media platforms and online communities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
