import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import Providers from "./providers";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediDoc",
  description: "Best medical service in the world!",
  icons: {
    icon: "/medidoc_logo.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="public/medidoc_logo.png"
          sizes="16x16"
          type="image/png"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <main className="max-w-[430px] mx-auto total_margin pb-[75px]">
            {children}
            <Navbar />
            {/* <ReactQueryDevtools /> */}
          </main>
        </Providers>
      </body>
    </html>
  );
}
