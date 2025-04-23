// src/components/theme/ThemeProvider.tsx

"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // 🔁 Load theme from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("aion-theme") as Theme;
    if (saved === "light" || saved === "dark" || saved === "system") {
      setTheme(saved);
    }
    setMounted(true);
  }, []);

  // 🌓 Apply theme to <html>
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolvedTheme = theme === "system" ? (systemPrefersDark ? "dark" : "light") : theme;

    root.classList.add(resolvedTheme);
    localStorage.setItem("aion-theme", theme);
  }, [theme, mounted]);

  const value: ThemeContextType = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem("aion-theme", theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      {mounted && children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("❌ useTheme must be used within ThemeProvider");
  }
  return context;
};