"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--aion-bg)] text-[var(--aion-fg)] px-6">
      <div className="text-center max-w-xl space-y-6">
        {/* 404 Heading */}
        <div className="flex items-center justify-center gap-4">
          <span className="text-6xl font-bold text-[var(--aion-primary)]">404</span>
          <div className="text-left">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Η σελίδα δεν βρέθηκε
            </h1>
            <p className="text-sm text-aion-muted mt-1">
              Η διεύθυνση που αναζητάτε δεν υπάρχει ή έχει μετακινηθεί.
            </p>
          </div>
        </div>

        {/* Emoji or Icon */}
        <div className="text-5xl">🚫</div>

        {/* Action Button */}
        <div>
          <Link
            href="/admin/dashboard"
            className="inline-block px-6 py-3 bg-aion-primary text-white text-sm font-medium rounded-md shadow-lg hover:bg-blue-700 transition"
          >
            Επιστροφή στο Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}