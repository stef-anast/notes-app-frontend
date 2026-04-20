import type { SVGProps } from "react";
import type { IconName } from "@/types";

type IconProps = SVGProps<SVGSVGElement>;

export const IconBack = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

export const IconCheck = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
  </svg>
);

export const IconChevronDown = (props: IconProps) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
  </svg>
);

export const IconChevronUp = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
  </svg>
);

export const IconClock = (props: IconProps) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" />
  </svg>
);

export const IconClose = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
  </svg>
);

export const IconCloudArrowUp = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 179 162" fill="currentColor" {...props}>
    <path d="M60.9 20.1c-14.8 3.5-27.8 13-35.7 26C18.9 56.5 16.4 74 19.4 86c3.4 13.6 13 28 18.5 28 1.5 0 3.5-.8 4.4-1.8 2.7-2.9 2-6.6-2-11.4-7.8-9.3-11.5-22.2-9.6-33.5 5-28.8 36.1-44.6 61.4-31.2 5.2 2.8 12.7 9.8 18.4 17.4 1.6 2.1 3.2 2.8 9 3.6 12.4 1.7 20.6 7.5 25.3 17.7 5 11 2.9 22.6-5.9 32.6-4.2 4.7-5 8.4-2.3 11 2.9 3 6.6 2 11.6-3.1 23-23.7 9.9-63.6-22.8-69.7-5.6-1-6.6-1.5-9.2-5.1-6.8-9.4-20.2-18-32-20.4-6.1-1.3-18.1-1.3-23.3 0" />
    <path d="M71.8 91.7c-15.1 15.1-16.2 16.7-13.8 21.4.8 1.3 2.1 1.9 4.7 1.9 3.1 0 4.6-1 11.9-8.2l8.4-8.2v23.2c0 22.7 0 23.1 2.2 24.6 3 2.1 5.4 2 7.8-.4 1.9-1.9 2-3.3 2-24.7V98.5l8.3 8.3c6.7 6.7 8.8 8.2 11.3 8.2 3.6 0 6.4-2.6 6.4-6S92.4 77 89 77c-1.7 0-6.4 4-17.2 14.7" />
  </svg>
);

export const IconEdit = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 30 30" fill="currentColor" {...props}>
    <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25Z" />
  </svg>
);

export const IconError = (props: IconProps) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" />
  </svg>
);

export const IconEye = (props: IconProps) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.01 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const IconEyeDisabled = (props: IconProps) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={`opacity-50 ${props.className ?? ""}`.trim()} {...props}>
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.01 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
    <path fillRule="evenodd" d="M0 0 L20 20 M20 0 L0 20" stroke="currentColor" strokeWidth={1.5} />
  </svg>
);

export const IconEyeOff = (props: IconProps) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074L3.707 2.293zM10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path d="M2 4.879A10.053 10.053 0 01.458 10c1.274 4.057 5.01 7 9.542 7 1.467 0 2.868-.292 4.142-.828L12.473 14.473A2.001 2.001 0 0110 14c-1.105 0-2-.895-2-2 0-.359.095-.69.26-1.003l-1.145-1.145A3.995 3.995 0 006 10c0 1.105.895 2 2 2a1.99 1.99 0 001.003-.26L6.855 13.145A3.988 3.988 0 006 14c-1.105 0-2-.895-2-2 0-.655.318-1.236.818-1.621L2 4.879z" />
  </svg>
);

export const IconFilterBars = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="6" y1="12" x2="18" y2="12" />
    <line x1="9" y1="18" x2="15" y2="18" />
  </svg>
);

export const IconMinus = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} fill="none" />
    <path d="M17 13H7v-2h10z" />
  </svg>
);

export const IconNote = (props: IconProps) => (
  <svg viewBox="-5 -5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M2.40039 0.400513H13.5996C14.0636 0.400513 14.5114 0.56126 14.8672 0.852661L15.0146 0.985474C15.3897 1.36055 15.5996 1.87008 15.5996 2.40051V9.20032H12C11.3503 9.20032 10.7238 9.42593 10.2256 9.83411L10.0205 10.0206C9.49541 10.5457 9.2002 11.2575 9.2002 12.0001V15.5997H2.40039C1.93643 15.5997 1.48864 15.439 1.13281 15.1476L0.985352 15.0148C0.610279 14.6397 0.400391 14.1302 0.400391 13.5997V2.40051L0.410156 2.20227C0.455657 1.7445 0.657213 1.31361 0.985352 0.985474C1.31349 0.657335 1.74438 0.455779 2.20215 0.410278L2.40039 0.400513ZM12 11.5997H15.293C15.2357 11.691 15.1721 11.7783 15.1006 11.8595L15.0137 11.9513L11.9512 15.0138C11.8447 15.1203 11.7262 15.2127 11.5996 15.2921V12.0001C11.5996 11.894 11.6418 11.7919 11.7168 11.7169C11.7918 11.6419 11.8939 11.5997 12 11.5997ZM4 9.20032C3.72148 9.20032 3.45281 9.29679 3.23926 9.4718L3.15137 9.55188C2.92645 9.7769 2.7998 10.0823 2.7998 10.4005C2.79989 10.6787 2.89664 10.9469 3.07129 11.1603L3.15137 11.2482C3.37641 11.4732 3.68174 11.5997 4 11.5997H7.2002C7.47874 11.5997 7.7474 11.5033 7.96094 11.3282L8.04883 11.2482C8.27353 11.0233 8.40029 10.7184 8.40039 10.4005C8.40039 10.122 8.30292 9.85331 8.12793 9.63977L8.04883 9.55188C7.82383 9.32688 7.51838 9.20037 7.2002 9.20032H4ZM4 6.00012C3.72152 6.00012 3.45279 6.09664 3.23926 6.27161L3.15137 6.35168C2.92638 6.57672 2.7998 6.8821 2.7998 7.20032C2.79985 7.47874 2.89636 7.74757 3.07129 7.96106L3.15137 8.04895C3.3764 8.27393 3.68179 8.40051 4 8.40051H12C12.2786 8.40051 12.5472 8.30316 12.7607 8.12805L12.8486 8.04895C13.0736 7.82395 13.2001 7.51851 13.2002 7.20032C13.2002 6.92193 13.1036 6.65308 12.9287 6.43958L12.8486 6.35168C12.6236 6.12664 12.3183 6.00012 12 6.00012H4ZM4 2.79993C3.72156 2.79993 3.45278 2.8965 3.23926 3.07141L3.15137 3.15149C2.92632 3.37653 2.7998 3.68186 2.7998 4.00012C2.7998 4.27856 2.89638 4.54734 3.07129 4.76086L3.15137 4.84875C3.37641 5.0738 3.68174 5.20032 4 5.20032H12C12.3183 5.20032 12.6236 5.0738 12.8486 4.84875C13.0737 4.62371 13.2002 4.31838 13.2002 4.00012C13.2002 3.72168 13.1036 3.4529 12.9287 3.23938L12.8486 3.15149C12.6236 2.92645 12.3183 2.79993 12 2.79993H4Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0.8}
    />
  </svg>
);

export const IconPlus = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconSave = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
  </svg>
);

export const IconTrash = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

// eslint-disable-next-line react-refresh/only-export-components
export const iconMap: Record<IconName, (p: IconProps) => React.ReactElement> = {
  eye: IconEye,
  "eye-off": IconEyeOff,
  "eye-disabled": IconEyeDisabled,
  "chevron-down": IconChevronDown,
  "chevron-up": IconChevronUp,
  back: IconBack,
  check: IconCheck,
  close: IconClose,
  plus: IconPlus,
  minus: IconMinus,
  edit: IconEdit,
  trash: IconTrash,
  save: IconSave,
  clock: IconClock,
  error: IconError,
  note: IconNote,
  "filter-bars": IconFilterBars,
  "cloud-arrow-up": IconCloudArrowUp,
};

export function Icon({ name, ...rest }: { name?: IconName } & IconProps) {
  const Cmp = name ? iconMap[name] : null;
  return Cmp ? <Cmp {...rest} /> : null;
}
