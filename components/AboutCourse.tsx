// components/AboutCourse.tsx

import React from "react";
import { ChevronDown } from "lucide-react";
// Make sure you import the necessary types from your central types file
import { Section } from "@/lib/course/types";

// 1. Define an interface for the component's props
interface AboutCourseProps {
  sections: Section[];
}

// 2. Apply the props interface to React.FC
const AboutCourse: React.FC<AboutCourseProps> = ({ sections }) => {
  // 3. Use a correct type guard to find the specific section.
  // This tells TypeScript: "If this function returns true, the 'section'
  // is the specific member of the 'Section' union where type is 'about'".
  const aboutSection = sections.find(
    (section): section is Extract<Section, { type: "about" }> =>
      section.type === "about"
  );

  // This check is now fully type-safe.
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

  // From here, TypeScript knows 'aboutSection.name' is a string and
  // 'aboutSection.values' is an array of 'About' objects.
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-0">
      <div id="about">
        <div className="mb-6 mt-4 max-w-[900px] md:mb-10 md:mt-[42px]">
          <div className="mt-10 md:mt-0">
            <h2 className="text-xl font-semibold text-gray-800 md:mb-4 md:text-2xl">
              {aboutSection.name}
            </h2>
            <div className="rounded-lg py-2 md:border md:border-gray-200 md:px-5">
              {/* TypeScript knows 'item' is of type 'About' */}
              {aboutSection.values.map((item, index) => (
                <details
                  key={item.id}
                  open={index === 0}
                  className="group mb-0 border-b border-dashed border-gray-300 last:border-none"
                >
                  <summary className="flex items-center justify-between py-4 cursor-pointer">
                    <div
                      className="max-w-[90%] font-medium text-gray-900 md:text-base"
                      // It knows 'item.title' exists and is a string
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <ChevronDown
                      className={`h-5 w-5 text-gray-600 transition-transform duration-200 group-open:rotate-180`}
                    />
                  </summary>
                  <div className="px-0 pb-2 text-gray-500">
                    <div
                      className="prose prose-ul:pl-4 max-w-none text-gray-700"
                      // It knows 'item.description' exists and is a string
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
