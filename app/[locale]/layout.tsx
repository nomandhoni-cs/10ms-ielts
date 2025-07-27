import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Assuming you have a Footer component

// --- Font Configuration (no changes needed) ---
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

// --- Data Fetching Function (using 'locale' now) ---
async function getCourseData(locale: string) {
  // Only fetch if locale is 'en' or 'bn' to avoid unnecessary API calls
  if (locale !== "en" && locale !== "bn") {
    return null;
  }
  try {
    const res = await fetch(
      `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${locale}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      console.error("API response not OK:", res.status);
      return null;
    }

    const json = await res.json();
    // Check if the API returned a soft error (e.g., empty data object)
    if (!json.data || !json.data.slug) {
      console.error("API returned success status but data is invalid.");
      return null;
    }

    return json.data;
  } catch (error) {
    console.error("Failed to fetch course data:", error);
    return null;
  }
}

// --- Dynamic Metadata Function (using 'locale') ---
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const courseData = await getCourseData(params.locale);

  return {
    title: courseData?.title || "10 Minute School",
    description: courseData?.description
      ? "A learning platform."
      : "Course description not available.",
  };
}

// --- Root Layout Component (using 'locale') ---
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Destructure locale from params
  const { locale } = params;
  const courseData = await getCourseData(locale);

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${notoSansBengali.variable} font-sans antialiased`}
      >
        <main className="relative">
          {/* Pass 'locale' and the fetched data to the Navbar */}
          <Navbar lang={locale} t={courseData} />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
