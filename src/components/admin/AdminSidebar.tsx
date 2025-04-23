"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import {
  LayoutDashboard,
  Package,
  Tag,
  Image,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

type SidebarProps = {
  collapsed: boolean;
  toggleCollapse: () => void;
};

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  emoji?: string;
  badge?: number;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, emoji: "📊" },
  { label: "Προϊόντα", href: "/admin/products", icon: Package, emoji: "📦", badge: 24 },
  { label: "Κατηγορίες", href: "/admin/categories", icon: Tag, emoji: "🗂️", badge: 8 },
  { label: "Πολυμέσα", href: "/admin/media", icon: Image, emoji: "🖼️", badge: 56 },
  { label: "Ρυθμίσεις", href: "/admin/settings", icon: Settings, emoji: "⚙️" },
];

export default function AdminSidebar({ collapsed, toggleCollapse }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <aside
      className={clsx(
        "h-screen flex flex-col overflow-hidden shadow-xl z-40 transition-all duration-300",
        "bg-white/10 dark:bg-gray-900/40 border-r border-white/20 dark:border-gray-800 backdrop-blur-lg",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* 🔷 Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 dark:border-gray-800">
        <Link href="/admin/dashboard" aria-label="AION Dashboard">
          <span className="text-lg font-semibold text-[var(--aion-primary)]">
            {collapsed ? "🌀" : "AION CMS"}
          </span>
        </Link>
        <button
          onClick={toggleCollapse}
          className="text-[var(--aion-muted)] hover:text-[var(--aion-primary)] transition"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft
            size={20}
            className={clsx("transition-transform", collapsed && "rotate-180")}
          />
        </button>
      </div>

      {/* 🔷 Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon, emoji, badge }) => {
          const isActive = pathname === href || pathname?.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm group transition-all",
                isActive
                  ? "bg-[var(--aion-primary)] text-white shadow font-semibold"
                  : "hover:bg-[var(--aion-bg-hover)] text-[var(--aion-fg)] dark:text-white"
              )}
              title={label}
            >
              {collapsed ? (
                <span
                  className={clsx("text-xl", isActive && "scale-110")}
                  aria-hidden
                >
                  {emoji}
                </span>
              ) : (
                <>
                  <Icon className="h-5 w-5" />
                  <span className="flex-1">{label}</span>
                  {badge !== undefined && (
                    <span className="ml-auto rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                      {badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 🔷 Footer */}
      <div className="px-2 py-4 border-t border-white/10 dark:border-gray-800">
        {!collapsed && <ThemeToggle />}
        <button
          onClick={handleLogout}
          className="mt-3 flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition"
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Αποσύνδεση</span>}
        </button>
        {!collapsed && (
          <div className="mt-4 text-xs text-center text-aion-muted">v0.1.0</div>
        )}
      </div>
    </aside>
  );
}