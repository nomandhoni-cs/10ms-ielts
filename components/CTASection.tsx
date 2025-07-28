import React from "react";
import { Button } from "./ui/button";
import { CtaText } from "@/lib/course/types";
interface CTAProps {
  cta_text: CtaText;
}
const CTASection: React.FC<CTAProps> = ({ cta_text }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-4 font-inter">
        <span className="text-2xl font-bold text-gray-800">৳3850</span>
        <span className="text-lg text-gray-500 line-through">৳5000</span>
        <div className="relative bg-orange-500 text-white py-1 px-3  pr-6 flex items-center shadow-md">
          <span className="text-sm font-medium whitespace-nowrap">
            ৳1150 ছাড়
          </span>
          <div className="absolute top-1/2 left-0 w-0 h-0 border-t-[14px] border-b-[14px] border-r-[14px] border-transparent border-r-orange-500 transform -translate-y-1/2 -translate-x-full"></div>
        </div>
      </div>
      <Button className="mt-4 bg-green-600 hover:bg-green-900 border-b-4 border-green-900 text-white py-4 rounded-md text-md text-center cursor-pointer">
        {cta_text.name}
      </Button>
    </div>
  );
};

export default CTASection;
