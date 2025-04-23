"use client";

import { useEffect, useState, useRef } from "react";
import { Sun, Moon, Menu, LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "@/components/theme/ThemeProvider";

type AdminHeaderProps = {
  toggleSidebar: () => void;
};

export default function AdminHeader({ toggleSidebar }: AdminHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Toggle theme
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  // Click outside dropdown
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 h-16 sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-gray-900/60 border-b border-white/20 dark:border-gray-800">
      {/* 👈 Sidebar toggle + Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-1 rounded hover:bg-[var(--aion-bg-hover)] transition md:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-[var(--aion-fg)] dark:text-white">
          AION Dashboard
        </h1>
      </div>

      {/* 👉 Theme toggle + User dropdown */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600"
        >
          <Image
            src="/avatar.png"
            alt="User"
            width={32}
            height={32}
            className="object-cover"
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
            <button
              onClick={() => router.push("/admin/profile")}
              className="flex items-center gap-2 px-4 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <User size={16} />
              Προφίλ
            </button>
            <button
              onClick={() => router.push("/admin/settings")}
              className="flex items-center gap-2 px-4 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <Settings size={16} />
              Ρυθμίσεις
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            >
              <LogOut size={16} />
              Αποσύνδεση
            </button>
            <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
              Θέμα: {theme}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}