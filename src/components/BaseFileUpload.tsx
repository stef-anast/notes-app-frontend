import { useId, useRef, useState, type DragEvent } from "react";
import { IconCloudArrowUp } from "./icons";

interface Props {
  value: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  acceptedFileTypesText?: string;
  maxSize?: number;
  id?: string;
}

export function BaseFileUpload({
  value,
  onChange,
  accept = "image/*",
  acceptedFileTypesText = "Images (PNG, JPG, GIF, SVG)",
  maxSize = 5,
  id,
}: Props) {
  const reactId = useId();
  const componentId = id || `base-file-upload-${reactId}`;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    setError(null);
    let isValidType = false;
    if (accept) {
      const patterns = accept.split(",").map((p) => p.trim().toLowerCase());
      const fileType = file.type.toLowerCase();
      const fileName = file.name.toLowerCase();
      for (const p of patterns) {
        if (p.startsWith(".")) {
          if (fileName.endsWith(p)) {
            isValidType = true;
            break;
          }
        } else if (p.endsWith("/*")) {
          if (fileType.startsWith(p.slice(0, -2) + "/")) {
            isValidType = true;
            break;
          }
        } else if (fileType === p) {
          isValidType = true;
          break;
        }
      }
      if (!isValidType) {
        setError(`Invalid file type. Accepted types: ${acceptedFileTypesText}`);
        onChange(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }
    }
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      setError(`File is too large. Max size: ${maxSize}MB`);
      onChange(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    onChange(file);
  };

  const trigger = () => {
    setError(null);
    fileInputRef.current?.click();
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
    if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer?.files?.[0]) processFile(e.dataTransfer.files[0]);
  };

  const clear = () => {
    setError(null);
    onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      id={componentId}
      role="button"
      tabIndex={0}
      aria-label="File upload area"
      onClick={trigger}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") trigger();
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`relative group flex flex-col items-center justify-center w-full px-6 py-10 border-2 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out ${
        isDragging ? "border-blue-600 bg-blue-50" : "border-blue-500 bg-gray-100 hover:bg-blue-50"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) processFile(e.target.files[0]);
        }}
      />
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 mb-4 rounded-lg bg-blue-500 flex items-center justify-center shadow-md">
          <IconCloudArrowUp className="w-6 h-6 text-white" />
        </div>
        <p className="text-sm text-gray-900">
          <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
        </p>
        <p className="mt-1 text-xs text-gray-800">{acceptedFileTypesText}</p>
        {value && (
          <div className="mt-4 text-sm text-center">
            <p className="font-semibold text-gray-700">Selected file: {value.name}</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clear();
              }}
              className="mt-2 text-xs text-red-500 hover:text-red-700 focus:outline-none cursor-pointer"
            >
              Remove file
            </button>
          </div>
        )}
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}
