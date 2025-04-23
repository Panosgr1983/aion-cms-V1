"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useState } from "react";
import clsx from "clsx";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[var(--aion-bg)] text-[var(--aion-fg)]">
      {/* Sidebar με toggle state */}
      <AdminSidebar
        collapsed={sidebarCollapsed}
        toggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Sticky Glass Header */}
        <div className="sticky top-0 z-40 backdrop-blur-lg bg-white/70 dark:bg-gray-900/60 border-b border-white/20 dark:border-gray-800 shadow-sm transition-colors">
          <AdminHeader toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        </div>

        {/* Main Content */}
        <main
          className={clsx(
            "flex-1 overflow-y-auto px-6 py-6 md:px-10 md:py-8",
            "bg-white dark:bg-gray-900 transition-colors duration-300"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}