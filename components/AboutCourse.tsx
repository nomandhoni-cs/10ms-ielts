import React from "react";
import { ChevronDown } from "lucide-react";
import { AboutSection, Section } from "@/lib/types";

interface AboutCourseProps {
  sections: Section[];
}

const AboutCourse: React.FC<AboutCourseProps> = ({ sections }) => {
  const aboutSection = sections.find(
    (section): section is AboutSection => section.type === "about"
  );

  if (
    !aboutSection ||
    !aboutSection.values ||
    aboutSection.values.length === 0
  ) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center text-gray-600">
        <p>No "About Course" information available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-0">
      <div id="about">
        <div className="mb-6 mt-4 max-w-[900px] md:mb-10 md:mt-[42px]">
          <div className="mt-10 md:mt-0">
            <h2 className="text-xl font-semibold text-gray-800 md:mb-4 md:text-2xl">
              {aboutSection.name}
            </h2>
            <div className="rounded-lg py-2 md:border md:border-gray-200 md:px-5">
              {aboutSection.values.map((item, index) => (
                <details
                  key={item.id}
                  open={index === 0}
                  className="group mb-0 border-b border-dashed border-gray-300 last:border-none"
                >
                  <summary className="flex items-center justify-between py-4 cursor-pointer">
                    <div
                      className="max-w-[90%] font-medium text-gray-900 md:text-base"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <ChevronDown
                      className={`h-5 w-5 text-gray-600 transition-transform duration-200 group-open:rotate-180`}
                    />
                  </summary>
                  <div className="px-0 pb-2 text-gray-500">
                    <div
                      className="prose prose-ul:pl-4 max-w-none text-gray-700"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCourse;
