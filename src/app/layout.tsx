import type { Metadata } from "next";
import "./globals.css";
import TgsCookieBanner from "@/components/tgs/TgsCookieBanner";

export const metadata: Metadata = {
  title:
    "The Global Sanctum | Curated Retreat Venues & Wellness Experiences Worldwide",
  description:
    "Discover exceptional retreat venues and wellness sanctuaries around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <TgsCookieBanner />
      </body>
    </html>
  );
}
