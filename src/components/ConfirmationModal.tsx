import { forwardRef, useImperativeHandle, useState } from "react";
import type { ButtonColor } from "@/types";
import { BaseButton } from "./BaseButton";
import { BaseModal } from "./BaseModal";

export interface ConfirmationModalHandle {
  openModal: () => void;
}

interface Props {
  title: string;
  message: string;
  confirmButtonText?: string;
  confirmButtonColor?: ButtonColor;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const ConfirmationModal = forwardRef<ConfirmationModalHandle, Props>(function ConfirmationModal(
  { title, message, confirmButtonText = "Confirm", confirmButtonColor = "primary", onConfirm, onCancel },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({ openModal: () => setIsOpen(true) }), []);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };
  const handleCancel = () => {
    onCancel?.();
    setIsOpen(false);
  };

  return (
    <BaseModal
      open={isOpen}
      onClose={handleCancel}
      title={title}
      hideHeaderBorder
      hideFooterBorder
      persistent
      body={<p className="text-gray-600">{message}</p>}
      footer={
        <>
          <BaseButton text="Cancel" variant="ghost" color="secondary" onClick={handleCancel} />
          <BaseButton
            text={confirmButtonText}
            color={confirmButtonColor}
            variant="light"
            onClick={handleConfirm}
          />
        </>
      }
    />
  );
});
