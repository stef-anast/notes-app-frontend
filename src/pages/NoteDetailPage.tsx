import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { BaseButton } from "@/components/BaseButton";
import { BaseCard } from "@/components/BaseCard";
import { EditNoteModal, type EditNoteModalHandle } from "@/components/EditNoteModal";
import { useNotes } from "@/store/notesContext";
import { NotFoundPage } from "./NotFoundPage";

export function NoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { findNote, updateSelectedItems, status } = useNotes();
  const navigate = useNavigate();
  const editRef = useRef<EditNoteModalHandle>(null);

  const parsedId = id !== undefined ? Number(id) : NaN;
  const isValidId = Number.isFinite(parsedId) && parsedId > 0;
  const note = isValidId ? findNote(parsedId) : undefined;

  useEffect(() => {
    document.title = note?.title ? `${note.title} — notes-app` : "Note";
  }, [note?.title]);

  if (!isValidId) {
    return <NotFoundPage title="Note not found" message="That note id doesn't look right." />;
  }

  if (status === "loading" || status === "idle") {
    return (
      <div className="flex items-center justify-center py-24 text-gray-500 font-inter">
        Loading…
      </div>
    );
  }

  if (!note) {
    return <NotFoundPage title="Note not found" message="This note may have been deleted or doesn't exist." />;
  }

  return (
    <div className="max-w-[800px] mx-auto px-4">
      <div className="flex justify-end mb-4">
        <BaseButton
          variant="ghost"
          color="dark"
          icon
          iconName="edit"
          text="Edit"
          size="small"
          onClick={() => editRef.current?.openModal(note)}
        />
      </div>
      <BaseCard
        title={note.title}
        description={note.description}
        type={note.type}
        imageUrl={note.imageUrl}
        checkboxItems={note.checkboxItems}
        selectedItems={note.selectedItems}
        onSelectedItemsChange={(items) => {
          void updateSelectedItems(note.id, items);
        }}
        truncateDescription={false}
        hoverable={false}
      />
      <div className="flex justify-center items-center mt-6 pb-6">
        <BaseButton
          variant="ghost"
          color="secondary"
          text="Back to all notes"
          size="small"
          onClick={() => navigate("/")}
        />
      </div>
      <EditNoteModal ref={editRef} />
    </div>
  );
}
