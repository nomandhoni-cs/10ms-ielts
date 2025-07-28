import React from "react";
import CheckList from "./CheckList";
import CTASection from "./CTASection";
import { ChecklistItem, CtaText } from "@/lib/course/types";

interface StickyEnrollProps {
  checklist: ChecklistItem[];
  cta_text: CtaText;
}

const StickyEnroll: React.FC<StickyEnrollProps> = ({ checklist, cta_text }) => {
  return (
    <div className="md:sticky md:top-[112px]">
      <div className="md:border p-4">
        <CTASection cta_text={cta_text} />
        <div className="mt-4">
          <CheckList checklist={checklist} />
        </div>
        <div className="flex justify-between items-center text-sm">
          <p className=" text-gray-500 text-center">
            কোর্সটি সম্পর্কে বিস্তারিত জানতে
          </p>
          <span className="flex items-center justify-center text-green-600 underline cursor-pointer">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
            </svg>
            <span className="ml-1">ফোন করুন (16910)</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default StickyEnroll;
