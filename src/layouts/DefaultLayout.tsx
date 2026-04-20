import { useMemo, useRef, type ReactNode } from "react";
import { AppHeader } from "@/components/AppHeader";
import { BaseButton } from "@/components/BaseButton";
import { FilterChips } from "@/components/FilterChips";
import { FilterDropdown } from "@/components/FilterDropdown";
import { CreateNoteModal, type CreateNoteModalHandle } from "@/components/CreateNoteModal";
import { useNotes } from "@/store/notesContext";
import { NoteType } from "@/types";
import { useViewport } from "@/hooks/useViewport";

export function DefaultLayout({ children }: { children: ReactNode }) {
  const { notes, selectedFilters, setFilters, removeFilter } = useNotes();
  const { isSmallScreenSize, isMediumScreenSize } = useViewport();
  const createModalRef = useRef<CreateNoteModalHandle>(null);

  const filterOptions = useMemo(
    () => [
      { value: NoteType.Default, label: "Default" },
      { value: NoteType.Image, label: "Image" },
      { value: NoteType.Checkbox, label: "Checkbox" },
    ],
    []
  );

  const showFiltersInHeader =
    selectedFilters.length > 0 && !(isSmallScreenSize || isMediumScreenSize);
  const showFiltersBelow =
    selectedFilters.length > 0 && (isSmallScreenSize || isMediumScreenSize);

  const { filteredNotes } = useNotes();

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f8f8]">
      <AppHeader />
      <main className="flex-grow pt-24 px-6 pb-6 flex flex-col">
        <section className="flex flex-nowrap justify-between items-center mb-6">
          <h2 className="font-semibold font-inter text-[1.75rem] m-0">Notes</h2>
          <div className="flex gap-3">
            {showFiltersInHeader && (
              <FilterChips
                filters={selectedFilters}
                filterOptions={filterOptions}
                onRemove={removeFilter}
              />
            )}
            <FilterDropdown
              value={selectedFilters}
              onChange={(v) => setFilters(v as NoteType[])}
              options={filterOptions}
              disabled={notes.length === 0}
            />
            <BaseButton
              text={isSmallScreenSize ? undefined : "Add New"}
              icon
              iconPosition="left"
              iconName="plus"
              size={isSmallScreenSize ? "icon" : "medium"}
              onClick={() => createModalRef.current?.openModal()}
            />
          </div>
        </section>

        {showFiltersBelow && (
          <div className="flex justify-end mb-4 flex-wrap">
            <FilterChips
              filters={selectedFilters}
              filterOptions={filterOptions}
              onRemove={removeFilter}
            />
          </div>
        )}

        <section
          className={
            filteredNotes.length > 0
              ? "grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]"
              : "flex-grow flex flex-col"
          }
        >
          {children}
        </section>
      </main>
      <CreateNoteModal ref={createModalRef} />
    </div>
  );
}
