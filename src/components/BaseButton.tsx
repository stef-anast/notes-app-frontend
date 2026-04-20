import { forwardRef, type ButtonHTMLAttributes } from "react";
import type { ButtonColor, ButtonSize, ButtonVariant, IconName } from "@/types";
import { iconMap } from "./icons";

export interface BaseButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  text?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  icon?: boolean;
  iconPosition?: "left" | "right";
  iconName?: IconName;
  type?: "button" | "submit" | "reset";
}

const sizeClasses: Record<Exclude<ButtonSize, "icon">, string> = {
  small: "px-4 py-1.5 text-sm",
  medium: "px-5 py-2 text-base",
  large: "px-6 py-3 text-base",
};

const colorClasses: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus-visible:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500",
    dark: "bg-gray-800 text-white hover:bg-gray-900 focus-visible:ring-gray-800",
    black: "bg-black text-white hover:bg-gray-800 focus-visible:ring-gray-600",
  },
  outline: {
    primary: "bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 focus-visible:ring-blue-600",
    secondary: "bg-transparent text-gray-700 border border-gray-400 hover:bg-gray-50 focus-visible:ring-gray-400",
    danger: "bg-transparent text-red-600 border border-red-600 hover:bg-red-50 focus-visible:ring-red-500",
    success: "bg-transparent text-green-600 border border-green-600 hover:bg-green-50 focus-visible:ring-green-600",
    dark: "bg-transparent text-gray-800 border border-gray-800 hover:bg-gray-100 focus-visible:ring-gray-800",
    black: "bg-transparent text-black border border-black hover:bg-gray-50 focus-visible:ring-gray-600",
  },
  light: {
    primary: "bg-blue-100 text-blue-600 hover:bg-blue-200 focus-visible:ring-blue-600",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus-visible:ring-gray-500",
    danger: "bg-red-100 text-red-600 hover:bg-red-200 focus-visible:ring-red-500",
    success: "bg-green-100 text-green-600 hover:bg-green-200 focus-visible:ring-green-600",
    dark: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus-visible:ring-gray-800",
    black: "bg-gray-100 text-black hover:bg-gray-200 focus-visible:ring-gray-600",
  },
  ghost: {
    primary: "text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-600",
    secondary: "text-gray-600 hover:bg-gray-100 focus-visible:ring-gray-500",
    danger: "text-red-600 hover:bg-red-50 focus-visible:ring-red-500",
    success: "text-green-600 hover:bg-green-50 focus-visible:ring-green-600",
    dark: "text-gray-800 hover:bg-gray-200 focus-visible:ring-gray-800",
    black: "text-black hover:bg-gray-100 focus-visible:ring-gray-600",
  },
};

const baseClasses =
  "font-inter rounded-full font-medium inline-flex items-center justify-center gap-x-1 transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer disabled:cursor-not-allowed";

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(function BaseButton(
  {
    text,
    variant = "solid",
    color = "primary",
    size = "medium",
    icon = false,
    iconPosition = "left",
    iconName = "plus",
    disabled = false,
    className = "",
    type = "button",
    ...rest
  },
  ref
) {
  const IconCmp = iconName ? iconMap[iconName] : null;

  const parts = [baseClasses];
  if (size === "icon") {
    parts.push("w-10 h-10 p-0");
  } else {
    parts.push(sizeClasses[size]);
  }

  if (disabled) {
    parts.push("text-white");
    parts.push(color === "black" ? "bg-gray-700" : "bg-gray-400");
  } else {
    if (variant === "ghost") {
      parts.push("bg-transparent border-transparent focus-visible:ring-offset-0");
    }
    parts.push(colorClasses[variant]?.[color] ?? "");
  }

  const iconCls = size === "icon" ? "w-6 h-6" : "w-5 h-5";

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={[parts.join(" "), className].filter(Boolean).join(" ")}
      {...rest}
    >
      {size === "icon" ? (
        IconCmp ? <IconCmp className={iconCls} /> : null
      ) : (
        <>
          {icon && iconPosition === "left" && IconCmp ? <IconCmp className={iconCls} /> : null}
          {text ? (
            <span className={icon && iconPosition === "right" ? "mr-1" : ""}>{text}</span>
          ) : null}
          {icon && iconPosition === "right" && text && IconCmp ? <IconCmp className={iconCls} /> : null}
        </>
      )}
    </button>
  );
});
