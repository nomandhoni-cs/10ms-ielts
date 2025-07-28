"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import Image from "next/image";
import { Section } from "@/lib/course/types";

interface TestimonialsProps {
  sections: Section[]; // Using the type-safe Section array
}

const Testimonials: React.FC<TestimonialsProps> = ({ sections }) => {
  const testimonialsSection = sections.find(
    (section): section is Extract<Section, { type: "testimonials" }> =>
      section.type === "testimonials"
  );

  // Ref for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // State to control visibility of navigation arrows
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Function to check and update arrow visibility based on scroll position
  const updateArrowVisibility = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Scroll handler for navigation buttons
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust scroll distance as needed
      if (direction === "left") {
        scrollContainerRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  // Effect to update arrow visibility on mount and scroll events
  useEffect(() => {
    updateArrowVisibility(); // Initial check
    const currentRef = scrollContainerRef.current;
    currentRef?.addEventListener("scroll", updateArrowVisibility);
    window.addEventListener("resize", updateArrowVisibility); // Also update on window resize

    return () => {
      currentRef?.removeEventListener("scroll", updateArrowVisibility);
      window.removeEventListener("resize", updateArrowVisibility);
    };
  }, []);

  // If no testimonials section or values are found, render a fallback message
  if (
    !testimonialsSection ||
    !testimonialsSection.values ||
    testimonialsSection.values.length === 0
  ) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center text-gray-600">
        <p>No testimonials information available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-0">
      {" "}
      {/* Outer wrapper for centering and padding */}
      <div id="testimonials">
        <div className="mb-10">
          {/* Section Title */}
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            {testimonialsSection.name}
          </h2>
          <div className="relative">
            {/* Right Navigation Arrow */}
            {showRightArrow && (
              <div
                className="absolute right-0 top-1/2 z-[3] -translate-y-1/2 cursor-pointer hidden lg:block" // Hidden on small screens, visible on large
                onClick={() => scroll("right")}
              >
                <ChevronRight className="w-8 h-8 text-black opacity-50 xl:mr-[-40px]" />
              </div>
            )}
            {/* Left Navigation Arrow */}
            {showLeftArrow && (
              <div
                className="absolute left-0 top-1/2 z-[2] -translate-y-1/2 cursor-pointer hidden lg:block" // Hidden on small screens, visible on large
                onClick={() => scroll("left")}
              >
                <ChevronLeft className="w-8 h-8 text-black opacity-50 xl:ml-[-40px]" />
              </div>
            )}

            {/* Testimonials Carousel Container */}
            <div
              ref={scrollContainerRef}
              // Removed scrollbar-hide to ensure it's hidden via global CSS if needed, or by specific utility
              className="relative flex flex-nowrap gap-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory py-2"
              style={{
                scrollbarWidth: "none",
                /* For Firefox */ msOverflowStyle: "none" /* For IE/Edge */,
              }} // Inline style for scrollbar hiding
            >
              {testimonialsSection.values.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 snap-center mr-4"
                >
                  <div className="relative mt-5 w-[260px] rounded-lg border border-gray-200 p-6 flex flex-col justify-between bg-white md:w-[372px] h-[300px] md:h-[350px]">
                    {" "}
                    {/* Fixed height for card */}
                    {/* Quote Icon */}
                    <div className="absolute -top-4 left-5 flex h-[38px] w-[38px] flex-row items-center justify-center rounded-full bg-[#FCE0D6] p-2">
                      <Quote className="w-5 h-5 text-[#D33242]" />{" "}
                      {/* Lucide Quote icon */}
                    </div>
                    {/* Conditional rendering for Video/Thumbnail or Testimonial Text */}
                    {testimonial.video_url ? (
                      <div className="w-full mb-4 overflow-hidden rounded-md aspect-video relative">
                        {/* Play Icon - links to YouTube */}
                        <a
                          href={`https://www.youtube.com/watch?v=${testimonial.video_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        >
                          <Image
                            alt="Play The Video"
                            src="https://10minuteschool.com/images/annual_exam/play_icon_2.svg" // Use the actual play icon if available
                            width={100}
                            height={100}
                            className="max-w-[20vw] w-20 h-20"
                            loading="lazy"
                          />
                        </a>
                        {/* Video Thumbnail */}
                        <Image
                          alt="Video Thumbnail"
                          src={testimonial.thumb}
                          width={867}
                          height={480}
                          className="w-full h-full object-cover rounded-md"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = `https://placehold.co/867x480/cccccc/000000?text=Video+Error`;
                          }}
                        />
                      </div>
                    ) : (
                      // Show testimonial text if no video URL
                      <div className="flex-1 text-gray-700 text-sm md:text-base leading-relaxed mb-4 text-clip overflow-y-hidden">
                        {testimonial.testimonial || testimonial.description}
                      </div>
                    )}
                    {/* User Profile */}
                    <div className="flex gap-4 items-center mt-auto">
                      {" "}
                      {/* mt-auto pushes to bottom */}
                      {testimonial.profile_image && (
                        <div className="rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            alt={`${testimonial.name}'s profile`}
                            src={testimonial.profile_image}
                            loading="lazy"
                            width={50}
                            height={50}
                            className="w-12 h-12 object-cover rounded-full" // Increased size slightly for better visibility
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {testimonial.description}{" "}
                          {/* Using description for score */}
                        </p>
                      </div>
                    </div>
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

export default Testimonials;
