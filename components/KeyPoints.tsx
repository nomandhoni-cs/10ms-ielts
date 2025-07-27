import React from "react";

// Define the expected structure for a single pointer item
interface PointersValue {
  color: string; // e.g., "black" - though we'll map to Tailwind classes
  icon: string; // "0" in your data, suggesting a static icon or placeholder
  id: string;
  text: string;
}

// Define the expected structure for the pointers section object
interface PointersSection {
  type: "pointers";
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: PointersValue[];
}

// Define the props interface for KeyPoints component
interface KeyPointsProps {
  sections: any[]; // Use a more specific type if 'sections' has a consistent structure
}

const KeyPoints: React.FC<KeyPointsProps> = ({ sections }) => {
  // Find the object in the 'sections' array where the 'type' property is "pointers"
  const pointersSection = sections.find(
    (section): section is PointersSection => section.type === "pointers"
  );

  // If no pointers section or values are found, render a fallback message
  if (
    !pointersSection ||
    !pointersSection.values ||
    pointersSection.values.length === 0
  ) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center text-gray-600">
        <p>No key points information available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-0">
      {" "}
      {/* Outer wrapper for centering and padding */}
      <div id="pointers">
        {/* Main container with responsive background and padding */}
        <div className="mb-6 md:mb-10 relative bg-gray-200 py-2 md:bg-white md:py-0">
          {/* Inner container for content padding */}
          <div className="pt-6 pb-6 bg-white md:pb-0 md:pt-0">
            <div>
              {/* Section Title */}
              <h2 className="mb-4 text-xl font-semibold text-gray-800 md:text-2xl">
                {pointersSection.name}
              </h2>
              {/* List container with border on medium screens */}
              <div className="rounded-md md:border md:border-gray-200">
                <div className="pt-2 md:p-6">
                  {/* Grid for list items */}
                  <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
                    {/* Map over the values to render each pointer item */}
                    {pointersSection.values.map((point) => (
                      <li
                        key={point.id}
                        className="flex items-start gap-2 mb-2"
                      >
                        {/* SVG Icon - using a checkmark icon.
                            The color is set to Tailwind's blue-500 (equivalent to #6294F8).
                            The 'currentColor' fill allows the SVG to inherit text color.
                        */}
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          className="mr-1 mt-[2px] text-blue-500 flex-shrink-0" // Added flex-shrink-0 to prevent icon from shrinking
                          height="20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        {/* Pointer Text */}
                        <div className="flex-1 text-gray-700">{point.text}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyPoints;
