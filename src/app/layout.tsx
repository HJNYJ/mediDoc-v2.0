import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import Providers from "./providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediDoc",
  description: "Best choice for medical checkup"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {/* <div className="max-w-mobile mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"> */}
          <main className="max-w-[430px] mx-[16px] total_margin">
            {children}
            <Navbar />
            {/* <ReactQueryDevtools /> */}
          </main>
          {/* </div> */}
        </Providers>
      </body>
    </html>
  );
}
