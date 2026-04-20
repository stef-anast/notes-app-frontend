import { forwardRef, useImperativeHandle, useRef } from "react";
import type { Note } from "@/types";
import { NoteType } from "@/types";
import { useNotes } from "@/store/notesContext";
import { BaseButton } from "./BaseButton";
import { BaseNoteForm, type BaseNoteFormHandle } from "./BaseNoteForm";

export interface CreateNoteModalHandle {
  openModal: () => void;
}

const defaultNote: Partial<Note> = {
  type: NoteType.Default,
  title: "",
  description: "",
};

export const CreateNoteModal = forwardRef<CreateNoteModalHandle>(function CreateNoteModal(_, ref) {
  const { addNote } = useNotes();
  const formRef = useRef<BaseNoteFormHandle>(null);

  useImperativeHandle(ref, () => ({ openModal: () => formRef.current?.openModal() }), []);

  const handleCreate = async (getFormData: () => Promise<Note>) => {
    try {
      const formData = await getFormData();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, ...rest } = formData;
      await addNote(rest);
      formRef.current?.closeModal();
    } catch (err) {
      console.error("Failed to create note", err);
      alert(err instanceof Error ? err.message : "Failed to create note");
    }
  };

  return (
    <BaseNoteForm
      ref={formRef}
      title="Create New Note"
      initialNote={defaultNote}
      renderFooter={({ isDisabled, getFormData }) => (
        <BaseButton
          text="Create"
          disabled={isDisabled}
          onClick={() => {
            void handleCreate(getFormData);
          }}
          className="w-full mt-6"
          variant="solid"
          icon
          iconName="note"
          size="large"
        />
      )}
    />
  );
});
