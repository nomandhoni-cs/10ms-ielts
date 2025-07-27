// app/[locale]/page.tsx

import AboutCourse from "@/components/AboutCourse";
import CourseFeatures from "@/components/CourseFeatures";
import CourseHeader from "@/components/CourseHeader";
import CourseInstructor from "@/components/CourseInstructor";
import DownloadPdf from "@/components/DownloadPdf";
import ExclusiveFeatures from "@/components/ExclusiveFeatures";
import Faq from "@/components/Faq";
import KeyPoints from "@/components/KeyPoints";
import StickyEnroll from "@/components/StickyEnroll";
import Testimonials from "@/components/Testimonials";

// The getCourseData function is well-written and can remain the same.
async function getCourseData(locale: string) {
  if (locale !== "en" && locale !== "bn") return null;
  try {
    const res = await fetch(
      `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${locale}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.data || !json.data.slug) return null;
    return json.data;
  } catch (error) {
    console.error("Failed to fetch course data:", error);
    return null;
  }
}

// Define the props type for clarity
interface HomePageProps {
  params: {
    locale: string;
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const courseData = await getCourseData(locale);

  if (!courseData) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Failed to load course data.</h1>
        <p>Please try again later or check the URL.</p>
      </div>
    );
  }

  const { title, description, media, checklist, cta_text, sections } =
    courseData;

  const thumbnail = media?.find(
    (m: any) => m.name === "thumbnail"
  )?.resource_value;

  const featuresTitle = locale === "bn" ? "কোর্স ফিচার" : "Course Features";

  return (
    <div>
      <CourseHeader
        title={title}
        description={description}
        media={media}
        checklist={checklist}
        cta_text={cta_text}
      />
      <section className="max-w-6xl mx-auto py-4 md:flex items-center justify-between">
        <div className="w-full md:max-w-[calc(100%_-_348px)] lg:max-w-[calc(100%_-_448px)]">
          <CourseInstructor sections={sections} />
          <CourseFeatures sections={sections} />
          <DownloadPdf sections={sections} />
          <KeyPoints sections={sections} />
          <AboutCourse sections={sections} />
          <ExclusiveFeatures sections={sections} />
          <Testimonials sections={sections} />
          <Faq sections={sections} />
        </div>
        <div className="block md:hidden">
          <StickyEnroll checklist={checklist} cta_text={cta_text} />
        </div>
      </section>
    </div>
  );
}
