import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Note } from "@/types";
import type { NoteType } from "@/types";
import * as notesApi from "@/api/notes";
import { useAuth } from "@/auth/authContext";

export interface NotesContextValue {
  notes: Note[];
  selectedFilters: NoteType[];
  filteredNotes: Note[];
  status: "idle" | "loading" | "ready" | "error";
  error: string | null;

  findNote: (id: string | number) => Note | undefined;
  refresh: () => Promise<void>;

  addNote: (note: Omit<Note, "id">) => Promise<Note>;
  updateNote: (note: Note) => Promise<Note>;
  updateSelectedItems: (id: number | string, selectedItems: string[]) => Promise<Note>;
  deleteNote: (id: string | number) => Promise<void>;

  setFilters: (filters: NoteType[]) => void;
  addFilter: (filter: NoteType) => void;
  removeFilter: (filter: NoteType) => void;
}

const NotesContext = createContext<NotesContextValue | null>(null);

export function NotesProvider({ children }: { children: ReactNode }) {
  const { status: authStatus } = useAuth();

  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<NoteType[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const data = await notesApi.listNotes();
      setNotes(data);
      setStatus("ready");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load notes");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (authStatus === "authenticated") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      refresh();
    } else if (authStatus === "unauthenticated") {
      setNotes([]);
      setSelectedFilters([]);
      setStatus("idle");
      setError(null);
    }
  }, [authStatus, refresh]);

  const filteredNotes = useMemo(() => {
    if (selectedFilters.length === 0) return notes;
    const set = new Set(selectedFilters);
    return notes.filter((n) => set.has(n.type));
  }, [notes, selectedFilters]);

  const findNote = useCallback(
    (id: string | number) => {
      const noteId = typeof id === "string" ? parseInt(id, 10) : id;
      return notes.find((n) => n.id === noteId);
    },
    [notes]
  );

  const addNote = useCallback(async (note: Omit<Note, "id">) => {
    const created = await notesApi.createNote(note);
    setNotes((prev) => [...prev, created]);
    return created;
  }, []);

  const updateNote = useCallback(async (note: Note) => {
    const saved = await notesApi.updateNote(note);
    setNotes((prev) => prev.map((n) => (n.id === saved.id ? saved : n)));
    return saved;
  }, []);

  const updateSelectedItems = useCallback(async (id: number | string, selectedItems: string[]) => {
    const saved = await notesApi.updateSelectedItems(id, selectedItems);
    setNotes((prev) => prev.map((n) => (n.id === saved.id ? saved : n)));
    return saved;
  }, []);

  const deleteNote = useCallback(async (id: string | number) => {
    await notesApi.deleteNote(id);
    const numeric = typeof id === "string" ? parseInt(id, 10) : id;
    setNotes((prev) => prev.filter((n) => n.id !== numeric));
  }, []);

  const setFilters = useCallback((filters: NoteType[]) => {
    setSelectedFilters(Array.from(new Set(filters)));
  }, []);
  const addFilter = useCallback((filter: NoteType) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev : [...prev, filter]));
  }, []);
  const removeFilter = useCallback((filter: NoteType) => {
    setSelectedFilters((prev) => prev.filter((f) => f !== filter));
  }, []);

  const value = useMemo<NotesContextValue>(
    () => ({
      notes,
      selectedFilters,
      filteredNotes,
      status,
      error,
      findNote,
      refresh,
      addNote,
      updateNote,
      updateSelectedItems,
      deleteNote,
      setFilters,
      addFilter,
      removeFilter,
    }),
    [
      notes,
      selectedFilters,
      filteredNotes,
      status,
      error,
      findNote,
      refresh,
      addNote,
      updateNote,
      updateSelectedItems,
      deleteNote,
      setFilters,
      addFilter,
      removeFilter,
    ]
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within a NotesProvider");
  return ctx;
}
