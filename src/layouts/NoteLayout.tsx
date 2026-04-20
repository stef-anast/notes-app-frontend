import type { ReactNode } from "react";
import { AppHeader } from "@/components/AppHeader";

export function NoteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f8f8]">
      <AppHeader />
      <main className="flex-grow pt-24 px-6 pb-6">{children}</main>
    </div>
  );
}
