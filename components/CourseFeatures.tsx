import Image from "next/image";

// Define the expected structure for a single feature item
interface FeatureValue {
  icon: string;
  id: string;
  subtitle: string;
  title: string;
}

// Define the expected structure for the features section object
interface FeatureSection {
  type: "features";
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: FeatureValue[];
}

// Define the props interface for CourseFeatures component
interface CourseFeaturesProps {
  sections: any[]; // Use a more specific type if 'sections' has a consistent structure
}

const CourseFeatures: React.FC<CourseFeaturesProps> = (props) => {
  const { sections } = props;

  // Find the object in the 'sections' array where the 'type' property is "features"
  const featuresSection = sections.find(
    (section): section is FeatureSection => section.type === "features"
  );

  // If no features section or values are found, render a fallback message
  if (
    !featuresSection ||
    !featuresSection.values ||
    featuresSection.values.length === 0
  ) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center text-gray-600">
        <p>No course features information available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-0">
      {" "}
      {/* Added padding for mobile */}
      <div id="features">
        <div className="flex flex-col gap-3">
          {/* Section Title */}
          <h2 className="text-xl font-semibold leading-[30px] text-black">
            {featuresSection.name}
          </h2>

          {/* Features Grid Container */}
          <div className="mb-16 grid grid-cols-1 gap-4 rounded-md border border-gray-700 bg-[#111827] p-6 md:grid-cols-2 md:gap-8">
            {/* Map over the values to render each feature item */}
            {featuresSection.values.map((feature) => (
              <FeatureItem key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Separate component for individual feature items to manage their own image loading state
interface FeatureItemProps {
  feature: FeatureValue;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ feature }) => {
  return (
    <div className="flex flex-row items-start gap-3 m-1">
      {/* Icon Container */}
      <div>
        <div className="mb-4 mx-auto transition-opacity duration-300 ease-in-out ">
          <Image
            alt={feature.title}
            src={feature.icon}
            loading="lazy"
            width={36}
            height={36}
            className="w-9 h-9 object-contain" // Tailwind classes for width, height, object-fit
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col flex-1 gap-2">
        <h2 className="text-[18px] font-medium leading-[26px] text-white">
          {feature.title}
        </h2>
        <h2 className="text-sm font-normal leading-[22px] text-[#9CA3AF]">
          {feature.subtitle}
        </h2>
      </div>
    </div>
  );
};

export default CourseFeatures;
