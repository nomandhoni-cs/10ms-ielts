import CheckList from "./CheckList";
import CourseThubmnail from "./CourseThubmnail";
import CTA from "./CTA";

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
          <div className="md:sticky md:top-[112px]">
            <div className="md:border p-4">
              <CTA cta_text={cta_text} />
              <div className="mt-4">
                <CheckList checklist={checklist} />
              </div>
              <div className="flex justify-between items-center text-sm">
                <p className=" text-gray-500 text-center">
                  কোর্সটি সম্পর্কে বিস্তারিত জানতে
                </p>
                <span className="flex items-center justify-center text-green-600 underline cursor-pointer">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
                  </svg>
                  <span className="ml-1">ফোন করুন (16910)</span>
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseHeader;
