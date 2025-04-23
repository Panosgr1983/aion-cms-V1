"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    setTimestamp(new Date().toLocaleTimeString());
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-aion-bg text-aion-fg px-6 relative overflow-hidden">
      {/* Grid Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[url('/grid.jpg')] bg-repeat pointer-events-none z-0"
      />

      {/* Aura Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aion-primary blur-3xl opacity-10 z-0"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center max-w-2xl space-y-8 backdrop-blur-md bg-white/10 px-10 py-14 rounded-2xl shadow-2xl border border-white/20"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight dark:text-white text-gray-900">
          👋 Καλώς ήρθατε στο <span className="text-aion-primary">AION CMS</span>
        </h1>
        <p className="text-lg sm:text-xl text-aion-muted leading-relaxed">
          Το μέλλον της διαχείρισης περιεχομένου για e-commerce, διαμορφωμένο για επιδόσεις, αισθητική και ευφυΐα.
        </p>
        <Link
          href="/login"
          className="inline-block bg-aion-primary text-white px-7 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          🚀 Συνδεθείτε ως διαχειριστής
        </Link>

        <p className="text-xs text-aion-muted">
          Debug: AION CMS UI loaded @ {timestamp}
        </p>
      </motion.div>
    </main>
  );
}