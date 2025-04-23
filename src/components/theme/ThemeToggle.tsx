"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { Sun, Moon, Laptop } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isActive = (value: string) => theme === value;

  const btnBase =
    "p-2 rounded-md border transition-colors duration-200 hover:bg-[var(--aion-bg-hover)]";

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Φως"
        onClick={() => setTheme("light")}
        className={`${btnBase} ${isActive("light") ? "bg-[var(--aion-primary)] text-white" : "text-[var(--aion-muted)]"}`}
      >
        <Sun className="w-5 h-5" />
      </button>
      <button
        aria-label="Σκοτάδι"
        onClick={() => setTheme("dark")}
        className={`${btnBase} ${isActive("dark") ? "bg-[var(--aion-primary)] text-white" : "text-[var(--aion-muted)]"}`}
      >
        <Moon className="w-5 h-5" />
      </button>
      <button
        aria-label="System"
        onClick={() => setTheme("system")}
        className={`${btnBase} ${isActive("system") ? "bg-[var(--aion-primary)] text-white" : "text-[var(--aion-muted)]"}`}
      >
        <Laptop className="w-5 h-5" />
      </button>
    </div>
  );
}