import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useNavigate } from "react-router";
import type { Note } from "@/types";
import { useNotes } from "@/store/notesContext";
import { BaseButton } from "./BaseButton";
import { BaseNoteForm, type BaseNoteFormHandle } from "./BaseNoteForm";
import { ConfirmationModal, type ConfirmationModalHandle } from "./ConfirmationModal";

export interface EditNoteModalHandle {
  openModal: (note: Note) => void;
}

interface Props {
  onUpdate?: (note: Note) => void;
}

export const EditNoteModal = forwardRef<EditNoteModalHandle, Props>(function EditNoteModal(
  { onUpdate },
  ref
) {
  const { updateNote, deleteNote } = useNotes();
  const navigate = useNavigate();
  const formRef = useRef<BaseNoteFormHandle>(null);
  const confirmRef = useRef<ConfirmationModalHandle>(null);
  const [noteToEdit, setNoteToEdit] = useState<Note | undefined>();

  useImperativeHandle(
    ref,
    () => ({
      openModal: (note: Note) => {
        setNoteToEdit(note);
        queueMicrotask(() => formRef.current?.openModal());
      },
    }),
    []
  );

  const handleSave = async (getFormData: () => Promise<Note>) => {
    try {
      const formData = await getFormData();
      await updateNote(formData);
      onUpdate?.(formData);
      formRef.current?.closeModal();
    } catch (err) {
      console.error("Failed to save note", err);
      alert(err instanceof Error ? err.message : "Failed to save note");
    }
  };

  const handleDelete = () => {
    if (noteToEdit) {
      deleteNote(noteToEdit.id);
      formRef.current?.closeModal();
      navigate("/");
    }
  };

  return (
    <>
      <BaseNoteForm
        ref={formRef}
        title="Edit Note"
        initialNote={noteToEdit}
        renderFooter={({ isDisabled, getFormData }) => (
          <div className="flex items-center gap-3 justify-between mt-6 w-full">
            <BaseButton
              text="Delete"
              variant="light"
              color="danger"
              icon
              iconName="trash"
              size="large"
              className="w-full"
              onClick={() => confirmRef.current?.openModal()}
            />
            <BaseButton
              text="Save"
              disabled={isDisabled}
              variant="solid"
              color="primary"
              icon
              iconName="save"
              size="large"
              className="w-full"
              onClick={() => {
                void handleSave(getFormData);
              }}
            />
          </div>
        )}
      />
      <ConfirmationModal
        ref={confirmRef}
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
        confirmButtonText="Delete"
        confirmButtonColor="danger"
        onConfirm={handleDelete}
      />
    </>
  );
});
