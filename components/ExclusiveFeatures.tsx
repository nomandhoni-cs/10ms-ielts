import { FeatureExplanationsSection, Section } from "@/lib/types";
import Image from "next/image";
import React from "react";

// Define the props interface for ExclusiveFeatures component
interface ExclusiveFeaturesProps {
  sections: Section[]; // Using the type-safe Section array
}

const ExclusiveFeatures: React.FC<ExclusiveFeaturesProps> = ({ sections }) => {
  // Find the object in the 'sections' array where the 'type' property is "feature_explanations"
  const featureExplanationsSection = sections.find(
    (section): section is FeatureExplanationsSection =>
      section.type === "feature_explanations"
  );

  // If no feature explanations section or values are found, render a fallback message
  if (
    !featureExplanationsSection ||
    !featureExplanationsSection.values ||
    featureExplanationsSection.values.length === 0
  ) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center text-gray-600">
        <p>No exclusive features information available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-0">
      {" "}
      {/* Outer wrapper for centering and padding */}
      <div id="feature_explanations">
        <div>
          <div className="flex flex-col gap-3 mb-10">
            {/* Section Title */}
            <h2 className="text-xl font-semibold leading-[30px] text-black">
              {featureExplanationsSection.name}
            </h2>
            {/* Features Grid Container */}
            <div className="grid grid-cols-1 px-5 border border-gray-200 divide-y divide-gray-200 rounded-md">
              {/* Map over the values to render each feature explanation item */}
              {featureExplanationsSection.values.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-start justify-between gap-3 py-5 md:flex-row"
                >
                  {/* Left Column: Title and Checklist */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-medium leading-[30px] text-[#111827] md:text-base">
                      {item.title}
                    </h2>
                    {/* Checklist items */}
                    {item.checklist.map((checklistItem, idx) => (
                      <div
                        key={idx}
                        className="flex flex-row items-center gap-5"
                      >
                        {/* SVG Checkmark Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="15"
                          fill="none"
                          viewBox="0 0 19 15"
                          className="text-blue-500 flex-shrink-0" // Using Tailwind for color
                        >
                          <path
                            fill="currentColor" // Use currentColor to inherit from text-blue-500
                            stroke="currentColor" // Use currentColor for stroke as well
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="0.893"
                            d="M18.168 1.508a.792.792 0 01-.006 1.111L6.645 14.143a.77.77 0 01-1.087.005L.77 9.433a.792.792 0 01-.015-1.11.77.77 0 011.098-.016l4.242 4.177L17.07 1.502a.77.77 0 011.098.006z"
                          ></path>
                        </svg>
                        <p className="text-sm font-normal leading-[24px] text-gray-700 md:text-base">
                          {checklistItem}
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* Right Column: Image */}
                  <div className="flex-shrink-0">
                    {" "}
                    {/* Prevents image from shrinking */}
                    {/* Image with dynamic source and alt text.
                        Note: For server components, image loading states (opacity transitions)
                        typically require client-side JavaScript. If this component needs to be
                        strictly server-side, the opacity transition might be removed or handled
                        differently (e.g., by a parent client component wrapping this).
                        For now, I'm keeping the image as a standard <img> tag.
                    */}
                    <Image
                      alt={item.title}
                      src={item.file_url}
                      loading="lazy"
                      width={250} // Original width from HTML
                      height={200} // Original height from HTML
                      className="w-full h-auto object-contain mb-4 mx-auto max-w-[350px]" // Responsive image styling
                      // Removed onLoad and onError for strict server-side component.
                      // Fallbacks for broken images should be handled by Next.js Image component or CSS.
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveFeatures;
