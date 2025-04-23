"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, User } from "lucide-react";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600"
      >
        <img src="/avatar.png" alt="User" className="object-cover w-full h-full" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md z-50">
          <button
            onClick={() => {
              setOpen(false);
              router.push("/admin/profile");
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <User size={16} />
            Προφίλ
          </button>
          <button
            onClick={() => {
              setOpen(false);
              router.push("/admin/settings");
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Settings size={16} />
            Ρυθμίσεις
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
          >
            <LogOut size={16} />
            Αποσύνδεση
          </button>
        </div>
      )}
    </div>
  );
}