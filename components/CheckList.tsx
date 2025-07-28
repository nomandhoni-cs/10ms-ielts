import Image from "next/image";

interface ChecklistItem {
  color: string;
  icon: string;
  id: string;
  list_page_visibility: boolean;
  text: string;
}

interface ChecklistProps {
  checklist: ChecklistItem[];
}

const CheckList: React.FC<ChecklistProps> = ({ checklist }) => {
  return (
    <div className="grid py-2 md:p-4 font-inter">
      <p className="mb-4 text-xl font-semibold text-gray-800">
        এই কোর্সে যা থাকছে
      </p>
      <div>
        {checklist.map((item) => (
          <div key={item.id} className="flex items-center mb-3 leading-5">
            <div
              className="inline-block h-5 w-5 transition-opacity duration-300 ease-in-out"
              style={{ opacity: 1 }}
            >
              <Image
                alt={item.text || "checklist icon"}
                src={item.icon}
                loading="lazy"
                width="20"
                height="20"
                decoding="async"
                className="w-5 h-5 object-contain"
              />
            </div>
            <h4 className="mb-0 inline-block pl-4 tracking-[0.005em] text-[#111827] text-base">
              {item.text}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckList;
