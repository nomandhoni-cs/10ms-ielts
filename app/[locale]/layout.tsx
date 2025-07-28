// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import "../globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import { CourseData, Language } from "@/lib/course/types";

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

async function getCourseData(locale: string): Promise<CourseData | null> {
  try {
    const res = await fetch(
      `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${locale}`,
      {
        headers: {
          "X-TENMS-SOURCE-PLATFORM": "web",
          accept: "application/json",
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch course data");
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Could not fetch metadata:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const courseData = await getCourseData(locale);

  // --- Fallback Metadata ---
  // If the API call fails or doesn't return SEO data, provide a safe default.
  if (!courseData?.seo) {
    return {
      title: "IELTS Course | 10 Minute School",
      description: "A complete IELTS preparation course from 10 Minute School.",
    };
  }

  const { seo } = courseData;

  // --- Process Open Graph meta tags ---
  const openGraphImages = seo.defaultMeta
    .filter(
      (meta) =>
        meta.value === "og:image" || meta.value === "og:image:secure_url"
    )
    .map((meta) => ({
      url: meta.content,
      // You can add width/height here if available from API
    }));

  const ogTitle = seo.defaultMeta.find(
    (meta) => meta.value === "og:title"
  )?.content;
  const ogDescription = seo.defaultMeta.find(
    (meta) => meta.value === "og:description"
  )?.content;
  const ogUrl = seo.defaultMeta.find(
    (meta) => meta.value === "og:url"
  )?.content;
  const ogLocale = seo.defaultMeta.find(
    (meta) => meta.value === "og:locale"
  )?.content;

  const jsonLdScripts = seo.schema
    .filter((item) => item.meta_value && item.meta_value.trim() !== "")
    .map((item, index) => ({
      [`json-ld-${index}`]: item.meta_value,
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: ogTitle || seo.title,
      description: ogDescription || seo.description,
      url: ogUrl,
      images: openGraphImages,
      locale: ogLocale,
      type: "website",
    },
    other: jsonLdScripts,
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

function isValidLanguage(locale: string): locale is Language {
  return locale === "en" || locale === "bn";
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  const validatedLang: Language = isValidLanguage(locale) ? locale : "bn"; // Default to 'bn' or 'en'
  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${notoSansBengali.variable} font-sans antialiased`}
      >
        <main className="relative">
          <Navbar lang={validatedLang} />
          <HeroBanner />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
