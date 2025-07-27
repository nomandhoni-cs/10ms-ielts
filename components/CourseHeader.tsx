import CheckList from "./CheckList";
import CourseThubmnail from "./CourseThubmnail";
import CTA from "./CTA";
import StickyEnroll from "./StickyEnroll";

const CourseHeader = (props) => {
  const { title, description, media, checklist, cta_text } = props;
  return (
    <div
      style={{
        backgroundImage:
          'url("https://cdn.10minuteschool.com/images/ui_%281%29_1716445506383.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-[300px] md:min-h-[300px]"
    >
      <div className="max-w-6xl mx-auto relative flex flex-col gap-4 md:flex-row md:gap-12 pb-6 md:py-10 min-h-[300px]">
        <div className="order-1 flex flex-col justify-center flex-1 md:order-1 md:max-w-[calc(100%_-_348px)] lg:max-w-[calc(100%_-_448px)]">
          <h1 className="text-white mb-2 text-[21px] font-semibold md:text-4xl">
            {title}
          </h1>
          <div className="mb-2">
            <button className="flex flex-row flex-wrap gap-2 text-white">
              <span className="inline-block">
                <img
                  className="md:w-[130px] w-[100px]"
                  src="https://cdn.10minuteschool.com/images/Dev_Handoff_Q1_24_Frame_2_1725444418666.png"
                  alt="Rating"
                />
              </span>
              <span className="inline-block text-sm md:text-base">
                (81.8% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)
              </span>
            </button>
          </div>
          <p
            className="text-gray-400"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        <section className="w-full md:max-w-[330px] lg:max-w-[400px] order-2 bg-white absolute right-0 md:top-[50px] md:absolute">
          <CourseThubmnail media={media} />
          <div className="hidden md:block">
            <StickyEnroll checklist={checklist} cta_text={cta_text} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseHeader;
