import { useId, useState, type InputHTMLAttributes } from "react";
import type { IconName, InputType } from "@/types";
import { iconMap } from "./icons";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type" | "value"> {
  value: string | number;
  onChange: (value: string) => void;
  label?: string;
  type?: InputType;
  placeholder?: string;
  supportingText?: string;
  errorMessage?: string;
  error?: boolean;
  disabled?: boolean;
  leadingIconName?: IconName;
  trailingIconName?: IconName;
  trailingIconAriaLabel?: string;
  onTrailingIconClick?: () => void;
  autoTogglePasswordVisibility?: boolean;
}

export function BaseTextField({
  value,
  onChange,
  label,
  type = "text",
  placeholder = "",
  supportingText = "",
  errorMessage = "",
  error = false,
  disabled = false,
  leadingIconName,
  trailingIconName,
  trailingIconAriaLabel = "Field action icon",
  id,
  onTrailingIconClick,
  autoTogglePasswordVisibility = true,
  className = "",
  ...rest
}: Props) {
  const reactId = useId();
  const inputId = id || `textfield-${reactId}`;
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const hasValue = value !== null && value !== undefined && value !== "";

  const inputType: string =
    type === "password" && isPasswordVisible ? "text" : type;

  let effectiveTrailing: IconName | undefined;
  if (type === "password" && autoTogglePasswordVisibility) {
    effectiveTrailing = disabled ? "eye-disabled" : isPasswordVisible ? "eye-off" : "eye";
  } else if (error && !trailingIconName) {
    effectiveTrailing = "error";
  } else {
    effectiveTrailing = trailingIconName;
  }

  const LeadingCmp = leadingIconName ? iconMap[leadingIconName] : null;
  const TrailingCmp = effectiveTrailing ? iconMap[effectiveTrailing] : null;

  const isPositionActive = isFocused || hasValue || disabled;

  let labelColor = "text-gray-900";
  if (disabled) labelColor = "text-gray-400";
  else if (error) labelColor = "text-red-600";
  else if (isFocused) labelColor = "text-blue-600";

  const labelClasses = label
    ? `absolute z-10 font-semibold pointer-events-none transition-all duration-200 ease-in-out ${
        leadingIconName ? "left-10" : "left-3"
      } ${labelColor} ${
        isPositionActive ? "text-xs scale-75 top-1.5 -translate-x-1 origin-top-left" : "top-3.5 text-base"
      }`
    : "sr-only";

  const baseInput = [
    "w-full bg-gray-200 h-14 px-3 py-3 text-base rounded-2xl border outline-none",
    "text-gray-900 placeholder-gray-500 disabled:text-gray-500",
    "transition-[border-color,background-color] duration-200",
    label ? "pt-6" : "py-3",
    leadingIconName ? "!pl-10" : "",
    effectiveTrailing ? "!pr-10" : "",
  ];

  let stateInput: string;
  if (disabled) stateInput = "bg-gray-100 border-gray-300 cursor-not-allowed !ring-0";
  else if (error) stateInput = "border-red-500 ring-1 ring-red-500 bg-white focus:border-red-500";
  else if (isFocused) stateInput = "border-blue-500 ring-1 ring-blue-500 bg-white";
  else stateInput = "bg-gray-200 border-gray-50 hover:bg-gray-100 hover:border-gray-100";

  const supportText = disabled ? supportingText : error && errorMessage ? errorMessage : supportingText;
  const supportClass = `mt-1.5 ml-3 text-xs ${
    disabled ? "text-gray-400" : error ? "text-red-600" : "text-gray-500"
  }`;

  const iconColor = (kind: "leading" | "trailing") => {
    if (disabled) return "text-gray-400";
    if (error && kind === "trailing" && effectiveTrailing === "error") return "text-red-500";
    if (
      isFocused &&
      kind === "trailing" &&
      !(type === "password" && autoTogglePasswordVisibility)
    )
      return "text-blue-500";
    if (type === "password" && autoTogglePasswordVisibility && kind === "trailing" && !error) {
      return isFocused ? "text-blue-500" : "text-gray-500";
    }
    return "text-gray-500";
  };

  const handleTrailing = () => {
    if (disabled) return;
    if (type === "password" && autoTogglePasswordVisibility) setIsPasswordVisible((v) => !v);
    onTrailingIconClick?.();
  };

  const wrapperState = [
    "relative group font-inter",
    hasValue ? "is-filled" : "",
    isFocused ? "is-focused" : "",
    error && !disabled ? "has-error" : "",
    disabled ? "is-disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperState}>
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {LeadingCmp && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <LeadingCmp className={`w-5 h-5 ${iconColor("leading")}`} aria-hidden="true" />
          </div>
        )}
        <input
          id={inputId}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused && !hasValue ? placeholder : ""}
          disabled={disabled}
          className={[...baseInput, stateInput].filter(Boolean).join(" ")}
          aria-labelledby={label ? `${inputId}-label-sr` : undefined}
          {...rest}
        />
        {TrailingCmp && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            <button
              type="button"
              onClick={handleTrailing}
              disabled={disabled}
              className={`focus:outline-none ${
                (type === "password" && autoTogglePasswordVisibility) || !!onTrailingIconClick
                  ? "cursor-pointer"
                  : "cursor-default"
              }`}
              aria-label={
                trailingIconAriaLabel ||
                (type === "password" && autoTogglePasswordVisibility
                  ? isPasswordVisible
                    ? "Hide password"
                    : "Show password"
                  : "Field action icon")
              }
            >
              <TrailingCmp className={`w-5 h-5 ${iconColor("trailing")}`} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      {supportText && <p className={supportClass}>{supportText}</p>}
      {label && (
        <span id={`${inputId}-label-sr`} className="sr-only">
          {label}
        </span>
      )}
    </div>
  );
}
