import { ChevronDown } from "lucide-react";
import { FaqSection, Section } from "@/lib/types";
interface FaqProps {
  sections: Section[]; // Using the type-safe Section array
}

const Faq: React.FC<FaqProps> = ({ sections }) => {
  const faqSection = sections.find(
    (section): section is FaqSection => section.type === "faq"
  );

  // If no FAQ section or values are found, render a fallback message
  if (!faqSection || !faqSection.values || faqSection.values.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center text-gray-600">
        <p>No FAQ information available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-0">
      {" "}
      {/* Outer wrapper for centering and padding */}
      <div id="faq">
        <div className="mb-0 bg-gray-200 pb-2 md:mb-12 md:bg-white md:py-0">
          <div className="pb-1 bg-white md:pb-0">
            <div className="mb-0">
              {/* Section Title */}
              <h2
                className="mb-4 text-base font-semibold text-gray-800 md:text-2xl"
                id="faq-title"
              >
                {faqSection.name}
              </h2>
              <div className="relative mb-20">
                <div className="rounded-md md:border md:border-gray-200 md:px-5">
                  {/* Map over the values to render each FAQ item */}
                  {faqSection.values.map((item, index) => (
                    <details
                      key={item.id}
                      // Open the first item by default.
                      // The browser handles subsequent toggling of the 'open' attribute.
                      open={index === 0}
                      // 'group' class allows styling children based on parent's state (e.g., 'open')
                      className="group border-b border-dashed border-gray-300 last:border-0"
                    >
                      <summary
                        // No onClick handler needed as native <details> handles toggling
                        className="flex items-center justify-between py-4 cursor-pointer"
                      >
                        {/* Question Title */}
                        <h3 className="text-sm font-semibold text-gray-900 md:text-base">
                          {item.question}
                        </h3>
                        {/* ChevronDown icon with conditional rotation using Tailwind's 'group-open' variant */}
                        <ChevronDown
                          className={`h-5 w-5 text-gray-600 transition-transform duration-200 group-open:rotate-180`}
                        />
                      </summary>
                      {/* Answer Content */}
                      <div className="pb-4">
                        {/* The 'prose' class from @tailwindcss/typography plugin would style the raw HTML.
                            Ensure you have it installed and configured in your tailwind.config.js for these styles to apply.
                        */}
                        <div
                          className="prose prose-ul:pl-4 max-w-none text-gray-700"
                          dangerouslySetInnerHTML={{ __html: item.answer }}
                        />
                      </div>
                    </details>
                  ))}
                </div>
                {/* "Show All Questions" Button */}
                {/* Note: If this button needs to dynamically show/hide more FAQs,
                    it would require client-side interactivity. As a server component,
                    it will just be a static button. */}
                <button className="absolute bottom-[-15px] left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 py-1 text-sm text-gray-500 shadow-[0px_0px_17.0361px_#E7EAF7] hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200">
                  সকল প্রশ্ন-উত্তর <ChevronDown className="h-4 w-4" />{" "}
                  {/* Using ChevronDown for the button icon */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
