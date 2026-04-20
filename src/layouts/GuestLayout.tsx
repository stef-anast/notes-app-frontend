import type { ReactNode } from "react";
import { Link } from "react-router";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function GuestLayout({ title, subtitle, children, footer }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f8f8] px-4 py-10 font-inter">
      <Link to="/" className="no-underline mb-8">
        <div className="inline-block font-lexend text-nowrap text-[#0a0c11] px-3 py-1 rounded-xl tracking-wider border-[2.5px] border-[#0a0c11] text-[22px] font-black">
          notes-app
        </div>
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 m-0">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
        </div>
        {children}
      </div>

      {footer && <div className="mt-6 text-sm text-gray-600">{footer}</div>}
    </div>
  );
}
