import Image from "next/image";
import { Button } from "./ui/button";

interface Background {
  image: string;
  primary_color: string;
  secondary_color: string;
}

interface CTA {
  clicked_url: string;
  color: string;
  text: string;
}

interface GroupJoinEngagementValue {
  background: Background;
  cta: CTA;
  description: string;
  description_color: string;
  id: string;
  thumbnail: string;
  title: string;
  title_color: string;
  top_left_icon_img: string;
}

interface GroupJoinEngagementSection {
  type: "group_join_engagement";
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: GroupJoinEngagementValue[];
}

interface DownloadPdfProps {
  sections: any[];
}

const DownloadPdf: React.FC<DownloadPdfProps> = ({ sections }) => {
  // Find the object in the 'sections' array where the 'type' property is "group_join_engagement"
  const engagementSection = sections.find(
    (section): section is GroupJoinEngagementSection =>
      section.type === "group_join_engagement"
  );

  const engagementValue = engagementSection?.values?.[0];

  if (!engagementSection || !engagementValue) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center text-gray-600">
        <p>No download information available.</p>
      </div>
    );
  }

  const titleColorClass =
    engagementValue.title_color === "#ffffff" ? "text-white" : "text-gray-800";
  const descriptionColorClass =
    engagementValue.description_color === "#ededed"
      ? "text-gray-200"
      : "text-gray-600";

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-0">
      {" "}
      <div id="group_join_engagement">
        <div className="relative flex flex-col md:flex-row gap-4 p-4 mb-8 overflow-hidden rounded-xl md:p-8 md:mb-12">
          <Image
            src={engagementValue.background.image}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover rounded-xl -z-10 transition-opacity duration-300 ease-in-out"
            width={300}
            height={100}
          />

          {/* Content Column 1 */}
          <div className="w-full md:w-1/2 z-0">
            <Image
              src={engagementValue.top_left_icon_img}
              alt="Icon"
              className=" w-48 mb-4 object-contain transition-opacity duration-300 ease-in-out"
              width={150}
              height={40}
            />
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
              <Button className="mt-6 px-6 py-4 cursor-pointer rounded-md font-semibold text-white bg-green-600 border-b-4 border-green-900 hover:bg-green-900 transition-colors duration-200">
                {engagementValue.cta.text}
              </Button>
            </a>
          </div>

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
