import { Link } from "react-router";
import { BaseCard } from "@/components/BaseCard";
import { useNotes } from "@/store/notesContext";

export function NotesListPage() {
  const { notes, filteredNotes, updateSelectedItems } = useNotes();

  if (filteredNotes.length === 0) {
    return (
      <div className="flex text-center justify-center flex-grow items-center font-inter pb-24">
        <div>
          {notes.length === 0 ? (
            <>
              <p className="text-lg text-gray-400 font-light">You don't have any notes yet.</p>
              <p className="mt-4 text-xl text-gray-500 font-light">
                Click "Add New" to get started!
              </p>
            </>
          ) : (
            <>
              <p className="text-lg text-gray-400 font-light">
                No notes match the selected filters.
              </p>
              <p className="mt-4 text-xl text-gray-500 font-light">
                Try adjusting your filters or add a new note.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {filteredNotes.map((note) => (
        <Link key={note.id} to={`/note/${note.id}`} className="no-underline">
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
          />
        </Link>
      ))}
    </>
  );
}
