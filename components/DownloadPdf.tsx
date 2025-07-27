import Image from "next/image";
import { Button } from "./ui/button";

// Define the expected structure for the background image
interface Background {
  image: string;
  primary_color: string;
  secondary_color: string;
}

// Define the expected structure for the call to action (CTA)
interface CTA {
  clicked_url: string;
  color: string;
  text: string;
}

// Define the expected structure for a single engagement value item
interface GroupJoinEngagementValue {
  background: Background;
  cta: CTA;
  description: string;
  description_color: string; // Hex color string, e.g., "#ededed"
  id: string;
  thumbnail: string;
  title: string;
  title_color: string; // Hex color string, e.g., "#ffffff"
  top_left_icon_img: string;
}

// Define the expected structure for the group_join_engagement section object
interface GroupJoinEngagementSection {
  type: "group_join_engagement";
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: GroupJoinEngagementValue[];
}

// Define the props interface for DownloadPdf component
interface DownloadPdfProps {
  sections: any[]; // Use a more specific type if 'sections' has a consistent structure
}

const DownloadPdf: React.FC<DownloadPdfProps> = ({ sections }) => {
  // Find the object in the 'sections' array where the 'type' property is "group_join_engagement"
  const engagementSection = sections.find(
    (section): section is GroupJoinEngagementSection =>
      section.type === "group_join_engagement"
  );

  // Extract the first engagement item's details if the section and values exist
  const engagementValue = engagementSection?.values?.[0];

  // If no engagement section or details are found, render a fallback message
  if (!engagementSection || !engagementValue) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center text-gray-600">
        <p>No download information available.</p>
      </div>
    );
  }

  // Determine Tailwind classes for dynamic colors.
  // Note: For truly arbitrary hex colors, inline styles or extending tailwind.config.js
  // would typically be required. Here, we map to common Tailwind colors for strict adherence
  // to "no inline styles" within the component.
  const titleColorClass =
    engagementValue.title_color === "#ffffff" ? "text-white" : "text-gray-800";
  const descriptionColorClass =
    engagementValue.description_color === "#ededed"
      ? "text-gray-200"
      : "text-gray-600";

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-0">
      {" "}
      {/* Outer wrapper for centering and padding */}
      <div id="group_join_engagement">
        <div className="relative flex flex-col md:flex-row gap-4 p-4 mb-8 overflow-hidden rounded-xl md:p-8 md:mb-12">
          {/* Background Image Layer:
              Uses an absolutely positioned <img> tag to apply dynamic background,
              adhering to the "no inline style" constraint for background-image.
              The opacity transition creates a fade-in effect.
          */}
          <Image
            src={engagementValue.background.image}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover rounded-xl -z-10 transition-opacity duration-300 ease-in-out"
            width={300}
            height={100}
          />

          {/* Content Column 1 */}
          <div className="w-full md:w-1/2 z-0">
            {" "}
            {/* z-0 to ensure content is above background */}
            {/* Top Left Icon */}
            <Image
              src={engagementValue.top_left_icon_img}
              alt="Icon"
              className=" w-48 mb-4 object-contain transition-opacity duration-300 ease-in-out"
              width={150}
              height={40}
            />
            {/* Title */}
            <h2 className={`text-xl font-semibold ${titleColorClass}`}>
              {engagementValue.title}
            </h2>
            {/* Description */}
            <p className={`mt-2 text-base ${descriptionColorClass}`}>
              {engagementValue.description}
            </p>
            {/* Button */}
            <a
              href={engagementValue.cta.clicked_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="mt-6 px-6 py-3 cursor-pointer rounded-md font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-200">
                {engagementValue.cta.text}
              </Button>
            </a>
          </div>

          {/* Content Column 2 (Thumbnail) - Hidden on small screens, visible on medium and up */}
          <div className="items-center hidden w-full md:w-1/2 md:flex justify-center z-0">
            <Image
              src={engagementValue.thumbnail}
              alt="Thumbnail"
              className="h-50 max-h-[200px] w-auto object-contain transition-opacity duration-300 ease-in-out"
              width={320}
              height={180}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPdf;
