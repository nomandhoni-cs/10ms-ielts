// This is a server component

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
      {/* Hero Banner using fetched data */}
      {thumbnail && (
        <div
          className="relative h-96 bg-cover bg-center text-white flex items-center justify-center"
          style={{ backgroundImage: `url(${thumbnail})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center p-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {courseData.title}
            </h1>
            {/* Use optional chaining here too for safety */}
            {courseData.description && (
              <div
                className="text-lg md:text-xl max-w-2xl mx-auto"
                dangerouslySetInnerHTML={{ __html: courseData.description }}
              />
            )}
          </div>
        </div>
      )}

      {/* Checklist section */}
      {courseData.checklist && (
        <div className="container mx-auto p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {featuresTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseData.checklist.map((item: any) => (
              <div
                key={item.id}
                className="p-4 border rounded-lg shadow-sm flex items-center gap-4"
              >
                <img src={item.icon} alt="" className="w-10 h-10" />
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
