// app/[locale]/page.tsx

import CourseHeader from "@/components/CourseHeader";

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

// FIX 1: Correctly handle the `params` prop.
// Do not destructure `locale` directly in the function signature.
export default async function HomePage({ params }: HomePageProps) {
  // FIX 2: Destructure `locale` inside the function body.
  const { locale } = await params;

  const courseData = await getCourseData(locale);

  // This is the correct way to handle a potential null return.
  // Check for null *before* trying to use the data.
  if (!courseData) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Failed to load course data.</h1>
        <p>Please try again later or check the URL.</p>
      </div>
    );
  }

  // Now that we know courseData is not null, we can safely destructure it.
  const { title, description, media, checklist, cta_text } = courseData;

  // The rest of your logic can remain the same.
  // The optional chaining you added is good practice.
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
    </div>
  );
}
