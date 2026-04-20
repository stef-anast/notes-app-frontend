import { useEffect, useId, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { BaseButton } from "./BaseButton";

let openModalCount = 0;
let savedBodyOverflow: string | null = null;

function lockBodyScroll() {
  if (openModalCount === 0) {
    savedBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  openModalCount += 1;
}

function unlockBodyScroll() {
  openModalCount = Math.max(0, openModalCount - 1);
  if (openModalCount === 0 && savedBodyOverflow !== null) {
    document.body.style.overflow = savedBodyOverflow;
    savedBodyOverflow = null;
  }
}

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  persistent?: boolean;
  hideHeaderBorder?: boolean;
  hideFooterBorder?: boolean;
  body?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

export function BaseModal({
  open,
  onClose,
  title = "",
  persistent = false,
  hideHeaderBorder = false,
  hideFooterBorder = false,
  body,
  footer,
  children,
}: Props) {
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !persistent) onClose();
    };
    document.addEventListener("keydown", handleEsc);
    lockBodyScroll();
    return () => {
      document.removeEventListener("keydown", handleEsc);
      unlockBodyScroll();
    };
  }, [open, persistent, onClose]);

  if (!open) return null;

  const content = (
    <div
      className="font-inter fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? `${id}-title` : undefined}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !persistent) onClose();
      }}
    >
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div
          className={`flex items-center justify-between p-5 flex-shrink-0 ${
            hideHeaderBorder ? "" : "border-b border-gray-200"
          }`}
        >
          {title ? (
            <h3 id={`${id}-title`} className="text-xl font-bold text-gray-900">
              {title}
            </h3>
          ) : (
            <span>&nbsp;</span>
          )}
          {!persistent && (
            <BaseButton
              size="icon"
              iconName="close"
              variant="ghost"
              color="secondary"
              aria-label="Close modal"
              onClick={onClose}
              className="-mr-2 -mt-2"
            />
          )}
        </div>

        <div className="pt-1 px-5 overflow-y-auto flex-grow space-y-4">
          {body ?? children ?? <p className="text-gray-600">Modal body content goes here.</p>}
        </div>

        {footer && (
          <div
            className={`flex items-center justify-end p-5 flex-shrink-0 space-x-3 ${
              hideFooterBorder ? "" : "border-t border-gray-200"
            }`}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
