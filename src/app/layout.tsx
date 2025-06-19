import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@components/header/Nav";
import { Footer } from "@components/footer/footer";
import { FavoritesStoreProvider } from "./stores/favoritesStoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Next.js Pokedex",
    template: "%s - Nexjt.js Pokedex",
  },
  description: "A Pokedex webapp made to learn nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body className={inter.className}>
        <FavoritesStoreProvider>
          <Header />
          {children}
          <Footer />
        </FavoritesStoreProvider>
      </body>
    </html>
  );
}
