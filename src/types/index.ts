export const NoteType = {
  Default: 0,
  Image: 1,
  Checkbox: 2,
} as const;
export type NoteType = (typeof NoteType)[keyof typeof NoteType];

export interface Note {
  id: number;
  title: string;
  description?: string;
  type: NoteType;
  imageUrl?: string;
  imageAlt?: string;
  checkboxItems?: CheckboxItem[];
  selectedItems?: string[];
}

export interface CheckboxItem {
  id: string;
  label: string;
}

export interface DropdownOption {
  value: string | number | boolean | null | undefined;
  label: string;
  disabled?: boolean;
  isSelectedInMulti?: boolean;
  [key: string]: unknown;
}

export type FilterDropdownOption = DropdownOption;

export type ButtonVariant = "solid" | "outline" | "ghost" | "light";

export type ButtonColor =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "dark"
  | "black";

export type ButtonSize = "small" | "medium" | "large" | "icon";

export type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url";

export type IconName =
  | "eye"
  | "eye-off"
  | "eye-disabled"
  | "chevron-down"
  | "chevron-up"
  | "back"
  | "check"
  | "close"
  | "plus"
  | "minus"
  | "edit"
  | "trash"
  | "save"
  | "clock"
  | "error"
  | "note"
  | "filter-bars"
  | "cloud-arrow-up";
