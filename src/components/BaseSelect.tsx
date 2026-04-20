import { useId, useMemo, useRef, useState } from "react";
import type { DropdownOption } from "@/types";
import { IconCheck, IconChevronDown, IconChevronUp } from "./icons";
import { useClickOutside } from "@/hooks/useClickOutside";

interface Props {
  value: DropdownOption["value"];
  onChange: (value: DropdownOption["value"]) => void;
  options: DropdownOption[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  supportingText?: string;
  id?: string;
}

export function BaseSelect({
  value,
  onChange,
  options,
  label,
  placeholder = "Select an option",
  disabled = false,
  error = false,
  errorMessage = "",
  supportingText = "",
  id,
}: Props) {
  const reactId = useId();
  const componentId = id || `base-select-${reactId}`;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);

  useClickOutside(wrapperRef, () => setIsOpen(false), isOpen);

  const hasValue = value !== undefined && value !== null && value !== "";

  const selected = useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  );
  const displayValue = selected ? selected.label : placeholder;

  const isLabelActive = isFocused || hasValue || disabled || !placeholder;

  const handleSelect = (opt: DropdownOption) => {
    if (opt.disabled) return;
    onChange(opt.value);
    setIsOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (!isOpen) setIsOpen(true);
        else if (highlighted >= 0 && options[highlighted]) handleSelect(options[highlighted]);
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) setIsOpen(true);
        else setHighlighted((i) => (i < options.length - 1 ? i + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!isOpen) setIsOpen(true);
        else setHighlighted((i) => (i > 0 ? i - 1 : options.length - 1));
        break;
    }
  };

  const frameClasses = disabled
    ? "bg-gray-100 border-gray-300 !ring-0"
    : isFocused
    ? "border-blue-600 ring-1 ring-blue-600 bg-white"
    : "bg-gray-200 border-gray-50 hover:bg-gray-100 hover:border-gray-100 focus-within:border-blue-600";

  let labelColor = "text-gray-900";
  if (disabled) labelColor = "text-gray-400";
  else if (isFocused) labelColor = "text-blue-600";

  const labelClasses = label
    ? `absolute z-10 font-semibold left-3 pointer-events-none transition-all duration-200 ease-in-out ${labelColor} ${
        isLabelActive
          ? "text-xs scale-75 top-1.5 -translate-x-1 origin-top-left"
          : "top-3.5 text-base"
      }`
    : "sr-only";

  const support = error && errorMessage ? errorMessage : supportingText;

  return (
    <div ref={wrapperRef} className="relative font-inter">
      {label && (
        <label htmlFor={`${componentId}-trigger`} className={labelClasses}>
          {label}
        </label>
      )}
      <div
        id={`${componentId}-trigger`}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? `${componentId}-options` : undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setIsOpen((o) => !o)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={onKeyDown}
        className={`relative w-full h-auto min-h-[3.5rem] rounded-2xl border outline-none text-base flex transition-[border-color,background-color] duration-200 ${
          label ? "pt-6 pb-1 px-3" : "p-3"
        } ${frameClasses} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 w-full">
          <span
            className={`block truncate w-full pb-1 ${
              hasValue ? "text-gray-900" : isLabelActive ? "text-gray-900" : "text-transparent"
            }`}
          >
            {hasValue ? displayValue : isLabelActive ? placeholder : ""}
          </span>
        </div>
        {!disabled && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {isOpen ? (
              <IconChevronUp className="w-5 h-5 text-gray-700" />
            ) : (
              <IconChevronDown className="w-5 h-5 text-gray-700" />
            )}
          </span>
        )}
      </div>

      {isOpen && (
        <div
          id={`${componentId}-options`}
          role="listbox"
          className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-2xl shadow-lg max-h-60 overflow-auto focus:outline-none text-base py-0.5"
        >
          <ul>
            {options.length === 0 && (
              <li className="relative cursor-default select-none py-2 px-3 text-gray-900 mt-0.5 mb-0.5">
                No options available
              </li>
            )}
            {options.map((opt, index) => {
              const isSel = opt.value === value;
              const isHl = highlighted === index;
              return (
                <li
                  key={`${index}-${String(opt.value)}`}
                  role="option"
                  aria-selected={isSel}
                  aria-disabled={opt.disabled}
                  onClick={() => handleSelect(opt)}
                  onMouseEnter={() => !opt.disabled && setHighlighted(index)}
                  className={`relative select-none py-2 px-3 text-gray-900 flex items-center gap-x-2 mb-0.5 first:mt-0.5 last:mb-0.5 ${
                    isHl && !opt.disabled
                      ? "bg-blue-50"
                      : isSel && !opt.disabled
                      ? "bg-blue-100"
                      : ""
                  } ${opt.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {isSel && !opt.disabled && <IconCheck className="w-4 h-4 text-blue-600" />}
                  <span className={`block truncate ${opt.disabled ? "text-gray-400" : ""}`}>
                    {opt.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {support && (
        <p
          className={`mt-1.5 ml-3 text-xs ${
            disabled ? "text-gray-400" : error ? "text-red-600" : "text-gray-500"
          }`}
        >
          {support}
        </p>
      )}
    </div>
  );
}
