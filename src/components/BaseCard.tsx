import type { CheckboxItem } from "@/types";
import { NoteType } from "@/types";
import { BaseCheckbox } from "./BaseCheckbox";

interface Props {
  title: string;
  description?: string;
  type?: NoteType;
  imageUrl?: string;
  imageAlt?: string;
  checkboxItems?: CheckboxItem[];
  selectedItems?: string[];
  onSelectedItemsChange?: (items: string[]) => void;
  truncateDescription?: boolean;
  hoverable?: boolean;
}

export function BaseCard({
  title,
  description,
  type = NoteType.Default,
  imageUrl,
  imageAlt = "Card image",
  checkboxItems = [],
  selectedItems = [],
  onSelectedItemsChange,
  truncateDescription = true,
  hoverable = true,
}: Props) {
  const selectedSet = new Set(selectedItems);

  const toggle = (id: string) => {
    if (type !== NoteType.Checkbox || !onSelectedItemsChange) return;
    const next = new Set(selectedItems);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectedItemsChange(Array.from(next));
  };

  return (
    <div
      className={`bg-white rounded-xl p-6 space-y-4 font-inter h-full transition-[transform] duration-200 ease-in-out ${
        hoverable ? "cursor-pointer hover:-translate-y-0.5 hover:scale-[1.01]" : ""
      }`}
    >
      {title && <h3 className="text-xl font-semibold text-gray-900">{title}</h3>}

      {type === NoteType.Image && (
        imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-auto object-cover rounded-2xl my-4"
          />
        ) : (
          <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center my-4">
            <span className="text-gray-400">Image placeholder</span>
          </div>
        )
      )}

      {description && (
        <p
          className={`text-gray-600 leading-relaxed overflow-hidden ${
            type === NoteType.Image && truncateDescription ? "line-clamp-3" : ""
          }`}
        >
          {description}
        </p>
      )}

      {type === NoteType.Checkbox && checkboxItems.length > 0 && (
        <div className="space-y-3 pt-2">
          {checkboxItems.map((item) => (
            <BaseCheckbox
              key={item.id}
              checked={selectedSet.has(item.id)}
              onChange={() => toggle(item.id)}
              label={item.label}
              value={item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
