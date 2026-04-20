import { useMemo, useRef, useState } from "react";
import type { FilterDropdownOption } from "@/types";
import { BaseButton } from "./BaseButton";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useViewport } from "@/hooks/useViewport";

interface Props {
  value: FilterDropdownOption["value"][];
  onChange: (value: FilterDropdownOption["value"][]) => void;
  options: FilterDropdownOption[];
  disabled?: boolean;
  closeOnSelect?: boolean;
}

export function FilterDropdown({
  value,
  onChange,
  options,
  disabled = false,
  closeOnSelect = false,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { isSmallScreenSize } = useViewport();

  useClickOutside(wrapperRef, () => setIsOpen(false), isOpen);

  const toggleable = useMemo(() => options.filter((o) => !o.disabled), [options]);

  const isAllSelected = useMemo(() => {
    if (!toggleable.length) return false;
    return toggleable.every((o) => value.includes(o.value));
  }, [toggleable, value]);

  const isIndeterminate = useMemo(() => {
    if (!toggleable.length) return false;
    const count = toggleable.filter((o) => value.includes(o.value)).length;
    return count > 0 && count < toggleable.length;
  }, [toggleable, value]);

  const isSelected = (opt: FilterDropdownOption) => value.includes(opt.value);

  const handleSelectAll = () => {
    if (isAllSelected) {
      const kept = value.filter((v) => {
        const o = options.find((x) => x.value === v);
        return o?.disabled;
      });
      onChange(kept);
    } else {
      const next = toggleable.map((o) => o.value);
      for (const o of options) {
        if (o.disabled && value.includes(o.value) && !next.includes(o.value)) {
          next.push(o.value);
        }
      }
      onChange(next);
    }
  };

  const handleOption = (opt: FilterDropdownOption) => {
    if (opt.disabled) return;
    const next = [...value];
    const idx = next.indexOf(opt.value);
    if (idx > -1) next.splice(idx, 1);
    else next.push(opt.value);
    onChange(next);
    if (closeOnSelect) setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative font-inter">
      <BaseButton
        text={isSmallScreenSize ? undefined : "Filter"}
        icon
        iconName="filter-bars"
        iconPosition="right"
        variant="solid"
        color="black"
        size={isSmallScreenSize ? "icon" : "medium"}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => !disabled && setIsOpen((o) => !o)}
      />

      {isOpen && (
        <div
          role="listbox"
          aria-multiselectable
          className={`absolute z-10 mt-2 w-32 ${
            isSmallScreenSize ? "right-0" : "left-0"
          } rounded-xl bg-white shadow-lg focus:outline-none`}
        >
          <ul>
            {options.length > 0 && (
              <li
                onClick={handleSelectAll}
                role="option"
                aria-label="Select all options"
                aria-selected={isAllSelected}
                className={`relative rounded-t-xl select-none py-2.5 px-4 text-sm text-gray-900 flex items-center gap-x-3 mb-0.5 cursor-pointer hover:bg-blue-50 ${
                  isAllSelected || isIndeterminate ? "bg-blue-100" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  readOnly
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  tabIndex={-1}
                />
                <span className="block">All</span>
              </li>
            )}
            {options.map((opt, index) => (
              <li
                key={`${index}-${String(opt.value)}`}
                role="option"
                aria-selected={isSelected(opt)}
                aria-disabled={opt.disabled}
                onClick={() => handleOption(opt)}
                className={`relative select-none py-2.5 px-4 text-sm text-gray-900 flex items-center gap-x-3 ${
                  isSelected(opt) && !opt.disabled ? "bg-blue-100" : ""
                } ${
                  opt.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:bg-blue-50"
                } ${index === options.length - 1 ? "rounded-b-xl" : "mb-0.5"}`}
              >
                <input
                  type="checkbox"
                  checked={isSelected(opt)}
                  disabled={opt.disabled}
                  readOnly
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  tabIndex={-1}
                />
                <span className="block">{opt.label}</span>
              </li>
            ))}
            {options.length === 0 && (
              <li className="relative cursor-default select-none py-2.5 px-4 text-sm text-gray-500 mb-0.5">
                No options available
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
