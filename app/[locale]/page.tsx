import CourseHeader from "@/components/CourseHeader";

async function getCourseData(locale: string) {
  if (locale !== "en" && locale !== "bn") return null;
  try {
    const res = await fetch(
      `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${locale}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    // Also check for the empty data object from the API
    if (!json.data || !json.data.slug) return null;
    return json.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const courseData = await getCourseData(locale);
  const { title, description, media, checklist, cta_text } = courseData || {};
  console.log(cta_text);

  // This check now correctly handles API failures or empty data
  if (!courseData) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Failed to load course data.</h1>
        <p>Please try again later or check the URL.</p>
      </div>
    );
  }

  // FIX: Use optional chaining (?.) to prevent crash if media is null
  const thumbnail = courseData.media?.find(
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
