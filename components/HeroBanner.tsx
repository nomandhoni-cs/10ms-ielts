"use client";

import React, { useState } from "react";
import Image from "next/image";
import { XIcon } from "lucide-react";

const HeroBanner: React.FC = () => {
  // State to manage if the banner is visible
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  const desktopBannerUrl =
    "https://cdn.10minuteschool.com/images/dasktop_banner_1753270611489.png";
  const mobileBannerUrl =
    "https://cdn.10minuteschool.com/images/mobile_banner_1753355543677.png";
  const bannerLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSfX6YBGXnY8YxNlVZOEP6Y9GVCWVo9Qe-aeCuGM_4NV5Hu30Q/viewform";

  // Stop the link navigation and hide the banner
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
  };

  return (
    // The z-index and relative positioning are applied here
    <div className="relative z-[2]">
      {/* The inline style for the background color is preserved */}
      <div className="bg-[#02090B]">
        <div className="relative">
          {/* The banner link with flexbox and positioning classes */}
          <a
            href={bannerLink}
            target="_blank"
            rel="noreferrer"
            className="relative z-[1] flex items-center justify-center"
          >
            {/* Desktop Image with responsive display classes */}
            <Image
              alt="banner image"
              src={desktopBannerUrl}
              width={1800}
              height={180}
              priority
              className="hidden w-auto sm:block"
            />
            {/* Mobile Image with responsive display classes */}
            <Image
              alt="banner image"
              src={mobileBannerUrl}
              width={768}
              height={143}
              priority
              className="w-auto sm:hidden"
            />
          </a>

          {/* The close button with absolute positioning, sizing, and responsive classes */}
          <button
            onClick={handleClose}
            aria-label="Close banner"
            className="absolute z-10 w-2 h-2 cursor-pointer right-4 top-1"
          >
            <XIcon className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
