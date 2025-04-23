"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  FolderKanban,
  ImageIcon,
  LogOut,
  Menu,
  Sun,
  Moon,
} from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Προϊόντα", icon: Package },
  { href: "/admin/categories", label: "Κατηγορίες", icon: FolderKanban },
  { href: "/admin/media", label: "Πολυμέσα", icon: ImageIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("aion_theme");
    if (stored === "dark") setDarkMode(true);
  }, []);

  // Sync darkMode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("aion_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("aion_theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Toggle Button (Mobile + Collapse) */}
      <div className="md:hidden p-4 bg-gray-900 text-white flex justify-between items-center">
        <h1 className="font-bold text-xl">AION CMS</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={clsx(
          "bg-gray-900 text-white h-screen shadow-lg flex flex-col transition-all duration-300 z-50",
          "md:w-64",
          isOpen ? "w-64" : "w-0 overflow-hidden",
          "fixed md:static top-0 left-0"
        )}
      >
        <div className="hidden md:block p-5 border-b border-gray-700">
          <h1 className="text-2xl font-extrabold tracking-wide">AION CMS</h1>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-3">
            {links.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={clsx(
                    "flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-gray-800",
                    pathname === href && "bg-gray-800 font-semibold"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition text-white"
          >
            <LogOut size={18} />
            Αποσύνδεση
          </button>
        </div>
      </aside>
    </>
  );
}