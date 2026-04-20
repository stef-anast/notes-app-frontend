import { useId, useState, type TextareaHTMLAttributes } from "react";

interface Props extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value"> {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  supportingText?: string;
  errorMessage?: string;
  error?: boolean;
  disabled?: boolean;
  rows?: number;
}

export function BaseTextarea({
  value,
  onChange,
  label,
  placeholder = "",
  supportingText = "",
  errorMessage = "",
  error = false,
  disabled = false,
  rows = 4,
  id,
  className = "",
  ...rest
}: Props) {
  const reactId = useId();
  const textareaId = id || reactId;
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== "";

  const isPositionActive = isFocused || hasValue || disabled;
  let labelColor = "text-gray-900";
  if (disabled) labelColor = "text-gray-400";
  else if (error) labelColor = "text-red-600";
  else if (isFocused) labelColor = "text-blue-600";

  const labelClasses = `absolute z-10 font-semibold left-3 pointer-events-none transition-all duration-200 ease-in-out ${labelColor} ${
    isPositionActive ? "text-xs scale-75 top-1.5 -translate-x-1 origin-top-left" : "top-3.5 text-base"
  }`;

  const base = [
    "w-full p-3 pt-6 text-base rounded-2xl border outline-none resize-y",
    "text-gray-900",
    disabled ? "placeholder-gray-400" : "placeholder-gray-500",
    "transition-[border-color,background-color] duration-200",
  ];

  let state: string;
  if (disabled) state = "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300 !ring-0";
  else if (error) state = "bg-white border-red-500 ring-1 ring-red-500 focus:border-red-500";
  else if (isFocused) state = "bg-white border-blue-500 ring-1 ring-blue-500";
  else state = "bg-gray-200 border-gray-50 hover:border-gray-100 hover:bg-gray-100";

  const support = disabled ? supportingText : error && errorMessage ? errorMessage : supportingText;
  const supportCls = `mt-1.5 ml-3 text-xs ${
    disabled ? "text-gray-400" : error ? "text-red-600" : "text-gray-500"
  }`;

  return (
    <div
      className={[
        "relative group",
        hasValue ? "is-filled" : "",
        isFocused ? "is-focused" : "",
        error && !disabled ? "has-error" : "",
        disabled ? "is-disabled" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <label htmlFor={textareaId} className={labelClasses}>
        {label}
      </label>
      <textarea
        id={textareaId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused && !value ? placeholder : ""}
        rows={rows}
        disabled={disabled}
        className={[...base, state].filter(Boolean).join(" ")}
        {...rest}
      />
      {(supportingText || (error && errorMessage)) && (
        <p className={supportCls}>{support}</p>
      )}
    </div>
  );
}
