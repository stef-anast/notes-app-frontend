import type { CheckboxItem, Note } from "@/types";
import { NoteType } from "@/types";
import { apiRequest } from "./client";

type BackendNoteTypeName = "DEFAULT" | "IMAGE" | "CHECKBOX";

interface BackendNote {
  id: number;
  title: string;
  description: string | null;
  type: BackendNoteTypeName;
  typeOrdinal: number;
  imageUrl: string | null;
  imageAlt: string | null;
  checkboxItems: CheckboxItem[] | null;
  selectedItems: string[] | null;
}

interface NoteRequestBody {
  title: string;
  description: string | null;
  type: BackendNoteTypeName;
  imageUrl: string | null;
  imageAlt: string | null;
  checkboxItems: CheckboxItem[] | null;
  selectedItems: string[] | null;
}

const ordinalToName: Record<NoteType, BackendNoteTypeName> = {
  [NoteType.Default]: "DEFAULT",
  [NoteType.Image]: "IMAGE",
  [NoteType.Checkbox]: "CHECKBOX",
};

function fromBackend(n: BackendNote): Note {
  return {
    id: n.id,
    title: n.title,
    description: n.description ?? undefined,
    type: n.typeOrdinal as NoteType,
    imageUrl: n.imageUrl ?? undefined,
    imageAlt: n.imageAlt ?? undefined,
    checkboxItems: n.checkboxItems ?? undefined,
    selectedItems: n.selectedItems ?? undefined,
  };
}

function toBackend(n: Omit<Note, "id">): NoteRequestBody {
  return {
    title: n.title,
    description: n.description ?? null,
    type: ordinalToName[n.type],
    imageUrl: n.imageUrl ?? null,
    imageAlt: n.imageAlt ?? null,
    checkboxItems: n.checkboxItems ?? null,
    selectedItems: n.selectedItems ?? null,
  };
}

export async function listNotes(types?: NoteType[]): Promise<Note[]> {
  const qs = types && types.length > 0 ? `?types=${types.join(",")}` : "";
  const data = await apiRequest<BackendNote[]>(`/api/notes${qs}`);
  return data.map(fromBackend);
}

export async function getNote(id: number | string): Promise<Note> {
  const data = await apiRequest<BackendNote>(`/api/notes/${id}`);
  return fromBackend(data);
}

export async function createNote(note: Omit<Note, "id">): Promise<Note> {
  const data = await apiRequest<BackendNote>(`/api/notes`, {
    method: "POST",
    body: toBackend(note),
  });
  return fromBackend(data);
}

export async function updateNote(note: Note): Promise<Note> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _id, ...rest } = note;
  const data = await apiRequest<BackendNote>(`/api/notes/${note.id}`, {
    method: "PUT",
    body: toBackend(rest),
  });
  return fromBackend(data);
}

export async function updateSelectedItems(id: number | string, selectedItems: string[]): Promise<Note> {
  const data = await apiRequest<BackendNote>(`/api/notes/${id}/selected-items`, {
    method: "PATCH",
    body: { selectedItems },
  });
  return fromBackend(data);
}

export async function deleteNote(id: number | string): Promise<void> {
  await apiRequest<void>(`/api/notes/${id}`, { method: "DELETE" });
}
