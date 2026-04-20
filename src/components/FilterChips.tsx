import type { NoteType } from "@/types";
import { IconClose } from "./icons";

interface Props {
  filters: NoteType[];
  filterOptions: Array<{ value: NoteType; label: string }>;
  onRemove: (filter: NoteType) => void;
}

export function FilterChips({ filters, filterOptions, onRemove }: Props) {
  if (filters.length === 0) return null;
  const sorted = [...filters].sort();
  const getLabel = (v: NoteType) => filterOptions.find((o) => o.value === v)?.label ?? "";

  return (
    <div className="flex items-center flex-wrap font-geist text-sm">
      {sorted.map((filter) => (
        <div
          key={filter}
          className="flex items-center gap-x-1.5 text-gray-800 font-semibold px-3"
        >
          {getLabel(filter)}
          <button
            type="button"
            onClick={() => onRemove(filter)}
            className="focus:outline-none"
          >
            <IconClose className="w-5 h-5 pt-0.25 text-gray-600 cursor-pointer hover:text-gray-800" />
          </button>
        </div>
      ))}
    </div>
  );
}
