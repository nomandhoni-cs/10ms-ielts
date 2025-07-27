// Define the type for a single checklist item
interface ChecklistItem {
  color: string; // e.g., "black"
  icon: string; // URL to the icon image
  id: string;
  list_page_visibility: boolean;
  text: string; // The text description for the item
}

// Define the props interface for the ChecklistComponent
interface ChecklistProps {
  checklist: ChecklistItem[]; // The checklist prop must be an array of ChecklistItem
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
              // The original HTML had opacity: 0 then 1 via inline style.
              // We'll set it directly to 1 here as it's the final state.
              style={{ opacity: 1 }}
            >
              <img
                alt={item.text || "checklist icon"} // Use item text as alt for accessibility
                src={item.icon}
                loading="lazy"
                width="20"
                height="20"
                decoding="async"
                className="w-5 h-5 object-contain" // Ensure image fits within 20x20, maintain aspect ratio
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
