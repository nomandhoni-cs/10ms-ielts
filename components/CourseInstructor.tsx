import Image from "next/image";

// Define the expected structure for the instructor value object for better type safety
interface InstructorValue {
  description: string;
  has_instructor_page: boolean;
  image: string;
  name: string;
  short_description: string;
  slug: string;
}

interface InstructorSection {
  type: "instructors";
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: InstructorValue[];
}

interface CourseInstructorProps {
  sections: any[];
}

const CourseInstructor: React.FC<CourseInstructorProps> = (props) => {
  const { sections } = props;

  // Find the object in the 'sections' array where the 'type' property is "instructors"
  const instructorSection = sections.find(
    (section): section is InstructorSection => section.type === "instructors"
  );

  // Extract the first instructor's details if the section and values exist
  const instructorDetails = instructorSection?.values?.[0];

  // If no instructor section or details are found, render a fallback message
  if (!instructorSection || !instructorDetails) {
    return (
      <div className="mx-auto p-4 text-center text-gray-600">
        <p>No instructor information available for this course.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-0 w-full">
      <div id="instructors">
        <div className="mb-7 bg-[#EEF2F4] pt-2 md:bg-transparent md:pt-0">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 md:text-2xl">
            {instructorSection.name}
          </h2>
          <div className="pt-4 pb-2 bg-white md:rounded-md md:border md:p-5">
            <div className="flex items-center">
              <div className="rounded-full overflow-hidden flex-shrink-0">
                <Image
                  alt={`Instructor ${instructorDetails.name}`}
                  src={instructorDetails.image}
                  loading="lazy"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover transition-opacity duration-300 ease-in-out"
                />
              </div>

              {/* Instructor Details */}
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  <a
                    className="flex items-center hover:text-green-600 transition-colors duration-200"
                    href={`/skills/instructors/${instructorDetails.slug}/`}
                  >
                    {instructorDetails.name}{" "}
                    <span className="ml-2 pb-[2px] flex items-center">
                      {/* SVG Icon for external link/profile */}
                      <svg
                        width="7"
                        height="11"
                        viewBox="0 0 7 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-500" // Tailwind class for fill color
                      >
                        <path
                          d="M1.49994 11C1.36833 11.0008 1.23787 10.9755 1.11603 10.9258C0.994195 10.876 0.883379 10.8027 0.789939 10.71C0.696211 10.617 0.621816 10.5064 0.571048 10.3846C0.520279 10.2627 0.494141 10.132 0.494141 9.99999C0.494141 9.86798 0.520279 9.73727 0.571048 9.61541C0.621816 9.49355 0.696211 9.38295 0.789939 9.28999L4.09994 5.99999L0.919939 2.68999C0.733688 2.50263 0.629147 2.24918 0.629147 1.98499C0.629147 1.7208 0.733688 1.46735 0.919939 1.27999C1.0129 1.18626 1.1235 1.11187 1.24536 1.0611C1.36722 1.01033 1.49793 0.984192 1.62994 0.984192C1.76195 0.984192 1.89266 1.01033 2.01452 1.0611C2.13638 1.11187 2.24698 1.18626 2.33994 1.27999L6.19994 5.27999C6.38317 5.46692 6.4858 5.71824 6.4858 5.97999C6.4858 6.24174 6.38317 6.49306 6.19994 6.67999L2.19994 10.68C2.11018 10.7769 2.00211 10.8551 1.88196 10.91C1.76181 10.965 1.63197 10.9955 1.49994 11Z"
                          fill="currentColor" // Use currentColor to inherit from text-gray-500
                        ></path>
                      </svg>
                    </span>
                  </a>
                </h3>
                {/* Instructor Description - using dangerouslySetInnerHTML for HTML content */}
                <div
                  className="text-sm text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: instructorDetails.description,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInstructor;
