// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import "../globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";

// --- Font Configuration ---
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-noto-sans-bengali",
});

// --- Data Fetching Function ---
async function getCourseData(locale: string) {
  try {
    const res = await fetch(
      `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${locale}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// --- Dynamic Metadata Function ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const courseData = await getCourseData(locale);

  return {
    title: courseData?.title || "10 Minute School",
    description: "A learning platform.",
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  const courseData = await getCourseData(locale);

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${notoSansBengali.variable} font-sans antialiased`}
      >
        <main className="relative">
          <Navbar lang={locale} t={courseData} />
          <HeroBanner />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
