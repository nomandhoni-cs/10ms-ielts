// src/app/layout.tsx

import type { Metadata } from "next";
// 1. Import the fonts you want from next/font/google
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import Footer from "@/components/Footer";

// 2. Configure the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Recommended for font performance
  variable: "--font-inter", // This will be the CSS variable name
});

// 3. Configure the Noto Sans Bengali font
const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "700"], // Only load the weights you need
  display: "swap",
  variable: "--font-noto-sans-bengali", // This will be the CSS variable name
});

export const metadata: Metadata = {
  title: "10 Minute School", // You can update this
  description: "A learning platform.", // You can update this
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 4. Apply the font variables to the body tag */}
      {/*    The `font-sans` class will be configured in Tailwind to use these variables */}
      <body
        className={`${inter.variable} ${notoSansBengali.variable} font-sans antialiased`}
      >
        <main className="relateive">
          <Navbar />
          <HeroBanner />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
