import { useEffect, useId, useRef } from "react";
import { IconCheck, IconMinus } from "./icons";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  indeterminate?: boolean;
  disabled?: boolean;
  id?: string;
  value?: string | number;
}

export function BaseCheckbox({
  checked,
  onChange,
  label = "",
  description = "",
  indeterminate = false,
  disabled = false,
  id,
  value,
}: Props) {
  const reactId = useId();
  const checkboxId = id || `checkbox-${reactId}`;
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const visual = disabled
    ? checked || indeterminate
      ? "bg-gray-300 border-gray-300"
      : "bg-gray-100 border-gray-300"
    : checked || indeterminate
    ? "bg-blue-600 border-blue-600 hover:bg-blue-700 peer-focus-visible:ring-blue-500"
    : "bg-white border-gray-400 hover:border-blue-600 peer-focus-visible:ring-blue-500";

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className={`flex items-start ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={stop}
    >
      <input
        ref={inputRef}
        id={checkboxId}
        type="checkbox"
        checked={checked}
        value={value}
        disabled={disabled}
        onChange={(e) => !disabled && onChange(e.target.checked)}
        className="sr-only peer"
      />
      <label
        htmlFor={checkboxId}
        className={`relative w-5 h-5 rounded border flex-shrink-0 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white ${visual} ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {checked && !indeterminate && (
          <IconCheck className="w-[18px] h-[18px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-white" />
        )}
        {indeterminate && (
          <IconMinus className="w-[18px] h-[18px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-white" />
        )}
      </label>
      {(label || description) && (
        <div className="ml-2.5 select-none">
          {label && (
            <label
              htmlFor={checkboxId}
              className={`block text-sm font-medium text-gray-800 ${
                disabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {label}
            </label>
          )}
          {description && (
            <p className={`text-xs text-gray-500 ${disabled ? "cursor-not-allowed" : ""}`}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
