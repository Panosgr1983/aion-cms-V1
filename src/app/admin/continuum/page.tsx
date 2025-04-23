"use client";

import { useEffect, useState } from "react";

export default function ContinuumViewer() {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/continuum/scan")
      .then((res) => res.json())
      .then((data) => setFiles(data.files));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">🧠 Continuum Log Viewer</h1>
      <ul className="bg-white p-4 rounded shadow text-sm">
        {files.map((file, i) => (
          <li key={i} className="py-1 border-b">{file}</li>
        ))}
      </ul>
    </div>
  );
}
