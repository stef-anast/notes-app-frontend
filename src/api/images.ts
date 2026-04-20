import { ApiError, getToken } from "./client";

const BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/+$/, "") ??
  "http://localhost:8080";

export interface UploadedImage {
  id: string;
  url: string;
  contentType: string;
  size: number;
}

export async function uploadImage(file: File): Promise<UploadedImage> {
  const form = new FormData();
  form.append("file", file);

  const headers: Record<string, string> = {};
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/api/images`, {
    method: "POST",
    headers,
    body: form,
  });

  const text = await res.text();
  let parsed: unknown = undefined;
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
  }

  if (!res.ok) {
    const message =
      (parsed && typeof parsed === "object" && "message" in parsed
        ? String((parsed as { message: unknown }).message)
        : null) ?? `Upload failed with status ${res.status}`;
    throw new ApiError(res.status, message, parsed);
  }

  return parsed as UploadedImage;
}
