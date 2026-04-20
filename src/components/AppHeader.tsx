import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/auth/authContext";
import { BaseButton } from "./BaseButton";

export function AppHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, status, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 px-6 py-4 bg-[#f8f8f8] transition-shadow duration-300 flex items-center justify-between gap-3 ${
        isScrolled ? "shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]" : ""
      }`}
    >
      <Link to="/" className="no-underline">
        <div className="inline-block font-lexend text-nowrap text-[#0a0c11] px-3 py-1 rounded-xl tracking-wider border-[2.5px] border-[#0a0c11] text-[22px] font-black">
          notes-app
        </div>
      </Link>
      {status === "authenticated" && (
        <div className="flex items-center gap-3 font-inter">
          {user && (
            <span className="hidden sm:inline text-sm text-gray-700">
              Hi <span className="font-semibold">{user.username}</span>
            </span>
          )}
          <BaseButton
            text="Sign out"
            variant="ghost"
            color="secondary"
            size="small"
            onClick={handleLogout}
          />
        </div>
      )}
    </header>
  );
}
