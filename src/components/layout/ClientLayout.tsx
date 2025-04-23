// src/components/layout/ClientLayout.tsx
"use client";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}