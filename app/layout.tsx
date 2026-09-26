import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "Dreazy Empire | Graphic Designer & Visual Content Creator",
  description:
    "Dreazy Empire — graphic design and visual content for Web3, digital brands, media platforms and online communities.",
  openGraph: {
    title: "Dreazy Empire | Graphic Designer & Visual Content Creator",
    description:
      "Graphic design and visual content for Web3, digital brands, media platforms and online communities.",
    images: [
      {
        url: "https://res.cloudinary.com/aobufb36/image/upload/v1790407561/file_00000000fb4481f4ac5e7c6325f80701.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dreazy Empire | Graphic Designer & Visual Content Creator",
    description:
      "Graphic design and visual content for Web3, digital brands, media platforms and online communities.",
    images: [
      "https://res.cloudinary.com/aobufb36/image/upload/v1790407561/file_00000000fb4481f4ac5e7c6325f80701.png",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={bricolage.variable}>
      <body>{children}</body>
    </html>
  );
}
