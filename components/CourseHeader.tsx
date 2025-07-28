import { ChecklistItem, CtaText, Media } from "@/lib/course/types";
import CourseThubmnail from "./CourseThubmnail";
import CTASection from "./CTASection";
import CheckList from "./CheckList";
import Image from "next/image";
import React from "react";

interface CourseHeaderProps {
  title: string;
  description: string;
  media: Media[];
  checklist: ChecklistItem[];
  cta_text: CtaText;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  title,
  description,
  media,
  checklist,
  cta_text,
}) => {
  return (
    <div
      style={{
        backgroundImage:
          'url("https://cdn.10minuteschool.com/images/ui_%281%29_1716445506383.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-min px-3 pt-6 pb-10 md:py-10" // Simplified padding
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:gap-12 md:relative">
        <section className="order-1 w-full px-4 md:order-2 md:px-0 md:max-w-[330px] lg:max-w-[400px] md:absolute md:right-0 md:top-0">
          <div className="md:bg-white">
            <CourseThubmnail media={media} />
            <div className="hidden md:block">
              <div className="md:sticky md:top-[112px]">
                <div className="p-4 md:border">
                  <CTASection cta_text={cta_text} />
                  <div className="mt-4">
                    <CheckList checklist={checklist} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="order-2 mt-6 flex flex-1 flex-col justify-center px-4 md:order-1 md:mt-0 md:px-0">
          <h1 className="text-white mb-2 text-[21px] font-semibold md:text-4xl">
            {title}
          </h1>
          <div className="mb-4">
            <button className="flex flex-row flex-wrap items-center gap-2 text-white">
              <span className="inline-block">
                <Image
                  className="w-[100px] md:w-[130px]"
                  src="https://cdn.10minuteschool.com/images/Dev_Handoff_Q1_24_Frame_2_1725444418666.png"
                  alt="Rating"
                  width={130}
                  height={30}
                />
              </span>
              <span className="inline-block text-sm md:text-base">
                (81.8% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)
              </span>
            </button>
          </div>
          <div
            className="text-gray-400"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
