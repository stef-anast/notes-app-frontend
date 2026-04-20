import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { CheckboxItem, Note } from "@/types";
import { NoteType } from "@/types";
import { uploadImage } from "@/api/images";
import { BaseModal } from "./BaseModal";
import { BaseSelect } from "./BaseSelect";
import { BaseTextField } from "./BaseTextField";
import { BaseTextarea } from "./BaseTextarea";
import { BaseFileUpload } from "./BaseFileUpload";
import { BaseButton } from "./BaseButton";

export interface BaseNoteFormHandle {
  openModal: () => void;
  closeModal: () => void;
}

export interface NoteFormFooterProps {
  isDisabled: boolean;
  getFormData: () => Promise<Note>;
}

interface Props {
  title: string;
  initialNote?: Partial<Note>;
  renderFooter: (props: NoteFormFooterProps) => ReactNode;
}

const noteTypeOptions = [
  { value: NoteType.Default, label: "Default Card Style" },
  { value: NoteType.Image, label: "Image Card Style" },
  { value: NoteType.Checkbox, label: "Checkbox Card Style" },
];

export const BaseNoteForm = forwardRef<BaseNoteFormHandle, Props>(function BaseNoteForm(
  { title, initialNote, renderFooter },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<NoteType | undefined>(initialNote?.type);
  const [noteTitle, setNoteTitle] = useState<string>(initialNote?.title ?? "");
  const [noteDescription, setNoteDescription] = useState<string>(initialNote?.description ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [checkboxOptions, setCheckboxOptions] = useState<{ id?: string; label: string }[]>(
    initialNote?.checkboxItems?.map((i) => ({ id: i.id, label: i.label })) ?? [{ label: "" }]
  );

  const lastInitialRef = useRef(initialNote);

  const resetForm = () => {
    const init = lastInitialRef.current;
    setSelectedType(init?.type);
    setNoteTitle(init?.title ?? "");
    setNoteDescription(init?.description ?? "");
    setImageFile(null);
    setCheckboxOptions(
      init?.checkboxItems?.map((i) => ({ id: i.id, label: i.label })) ?? [{ label: "" }]
    );
  };

  useImperativeHandle(
    ref,
    () => ({
      openModal: () => {
        lastInitialRef.current = initialNote;
        resetForm();
        setIsOpen(true);
      },
      closeModal: () => setIsOpen(false),
    }),
    [initialNote]
  );

  const addCheckboxOption = () =>
    setCheckboxOptions((opts) => [...opts, { label: "" }]);
  const removeCheckboxOption = (index: number) =>
    setCheckboxOptions((opts) => opts.filter((_, i) => i !== index));
  const updateCheckboxLabel = (index: number, label: string) =>
    setCheckboxOptions((opts) =>
      opts.map((o, i) => (i === index ? { ...o, label } : o))
    );

  const isDirty = useMemo(() => {
    const init = initialNote;
    if (!init) return true;
    if (noteTitle !== (init.title ?? "")) return true;
    if (noteDescription !== (init.description ?? "")) return true;
    if (selectedType !== init.type) return true;
    if (selectedType === NoteType.Image && imageFile !== null) return true;
    if (selectedType === NoteType.Checkbox) {
      const before = JSON.stringify(init.checkboxItems?.map((i) => i.label) ?? []);
      const now = JSON.stringify(checkboxOptions.map((i) => i.label));
      if (before !== now) return true;
    }
    return false;
  }, [initialNote, noteTitle, noteDescription, selectedType, imageFile, checkboxOptions]);

  const isActionDisabled = useMemo(() => {
    if (selectedType === undefined || !noteTitle || !noteDescription) return true;
    if (selectedType === NoteType.Image && !imageFile && !initialNote?.imageUrl) return true;
    if (selectedType === NoteType.Checkbox) {
      if (checkboxOptions.length === 0 || checkboxOptions.some((o) => !o.label)) return true;
    }
    if (initialNote) return !isDirty;
    return false;
  }, [selectedType, noteTitle, noteDescription, imageFile, checkboxOptions, initialNote, isDirty]);

  const getFormData = async (): Promise<Note> => {
    const trimmedTitle = noteTitle.trim();
    const trimmedDescription = noteDescription.trim();

    const data: Partial<Note> = {
      id: initialNote?.id,
      title: trimmedTitle,
      description: trimmedDescription,
      type: selectedType as NoteType,
    };

    if (data.type === NoteType.Image) {
      if (imageFile) {
        const uploaded = await uploadImage(imageFile);
        data.imageUrl = uploaded.url;
        data.imageAlt = trimmedTitle;
      } else {
        data.imageUrl = initialNote?.imageUrl;
        data.imageAlt = initialNote?.imageAlt;
      }
    }

    if (data.type === NoteType.Checkbox) {
      const items: CheckboxItem[] = checkboxOptions
        .map((o) => ({ ...o, label: o.label.trim() }))
        .filter((o) => o.label)
        .map((o, i) => ({
          id: o.id || `new-opt-${Date.now()}-${i}`,
          label: o.label,
        }));
      data.checkboxItems = items;
      data.selectedItems = initialNote?.selectedItems ?? [];
    }

    return data as Note;
  };

  return (
    <BaseModal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      title={title}
      hideHeaderBorder
      hideFooterBorder
      body={
        <div className="space-y-4">
          <BaseSelect
            value={selectedType}
            onChange={(v) => setSelectedType(v as NoteType)}
            options={noteTypeOptions}
            label="Select type of card"
          />

          <BaseTextField
            value={noteTitle}
            onChange={setNoteTitle}
            label="Header"
            placeholder="Enter a title"
          />

          {selectedType === NoteType.Image && (
            <BaseFileUpload
              value={imageFile}
              onChange={setImageFile}
              acceptedFileTypesText="SVG, PNG, JPG or GIF"
            />
          )}

          <BaseTextarea
            value={noteDescription}
            onChange={setNoteDescription}
            label="Description"
            placeholder="Enter a description"
          />

          {selectedType === NoteType.Checkbox && (
            <div className="space-y-4">
              <label className="block font-medium text-gray-900">Add option</label>
              {checkboxOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-1">
                  <BaseTextField
                    value={option.label}
                    onChange={(v) => updateCheckboxLabel(index, v)}
                    placeholder="Text Placeholder"
                    label={`Option ${index + 1}`}
                    className="flex-grow"
                  />
                  {checkboxOptions.length > 1 && (
                    <BaseButton
                      icon
                      iconName="minus"
                      variant="ghost"
                      color="secondary"
                      size="icon"
                      onClick={() => removeCheckboxOption(index)}
                    />
                  )}
                </div>
              ))}
              <BaseButton
                text="Add option"
                size="large"
                icon
                iconName="plus"
                color="success"
                className="w-full"
                onClick={addCheckboxOption}
              />
            </div>
          )}
        </div>
      }
      footer={
        <div className="w-full">
          <hr className="border-1 border-dashed border-gray-200" />
          {renderFooter({ isDisabled: isActionDisabled, getFormData })}
        </div>
      }
    />
  );
});
