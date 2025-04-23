import "./globals.css";

export const metadata = {
  title: "AION CMS",
  description: "Content Management System για ηλεκτρονικά καταστήματα",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--aion-bg)] text-[var(--aion-fg)] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}