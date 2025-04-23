"use client";

import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/admin/Breadcrumbs";
import AdminCard from "@/components/admin/cards/AdminCard";
import ImageUploader from "@/components/admin/ImageUploader";
import clsx from "clsx"; // Αν θες καθαρό toggling κλάσεων

// Τύπος αντικειμένου πολυμέσου
interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: string;
  size: number;
  createdAt?: string;
}

export default function MediaPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  // Προσομοίωση αρχικής φόρτωσης από API
  useEffect(() => {
    setTimeout(() => {
      setMediaItems([
        {
          id: "1",
          url: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
          name: "sample.jpg",
          type: "image/jpeg",
          size: 123456,
          createdAt: "2025-04-01",
        },
        {
          id: "2",
          url: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample2.jpg",
          name: "sample2.jpg",
          type: "image/jpeg",
          size: 234567,
          createdAt: "2025-04-02",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  // Φορμάτ μεγέθους
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  // Ανέβασμα νέων αρχείων (mock)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    setTimeout(() => {
      const uploaded = Array.from(files).map((file, i) => ({
        id: `upload-${Date.now()}-${i}`,
        url: URL.createObjectURL(file),
        name: file.name,
        type: file.type,
        size: file.size,
        createdAt: new Date().toISOString(),
      }));
      setMediaItems((prev) => [...uploaded, ...prev]);
      setUploading(false);
    }, 1000);
  };

  // Επιλογή αρχείου για μαζικές ενέργειες
  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Μαζική διαγραφή
  const deleteSelected = () => {
    if (
      selected.length > 0 &&
      confirm(`Διαγραφή ${selected.length} αρχείων;`)
    ) {
      setMediaItems((prev) => prev.filter((item) => !selected.includes(item.id)));
      setSelected([]);
    }
  };

  // Διαγραφή μεμονωμένου
  const handleDelete = (id: string) => {
    if (confirm("Διαγραφή αρχείου;")) {
      setMediaItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Φιλτράρισμα με βάση αναζήτηση
  const filteredItems = mediaItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Αρχεία Πολυμέσων</h1>

        <div className="flex gap-2">
          {selected.length > 0 && (
            <button
              onClick={deleteSelected}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded transition"
            >
              Διαγραφή ({selected.length})
            </button>
          )}

          <label htmlFor="upload" className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition">
            {uploading ? "Ανέβασμα..." : "Ανέβασμα"}
            <input
              id="upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Αναζήτηση */}
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Αναζήτηση αρχείων..."
          className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Πίνακας ή loading */}
      <AdminCard title="Συλλογή Αρχείων">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Φόρτωση...</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Δεν βρέθηκαν αρχεία.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white border rounded overflow-hidden shadow hover:shadow-md transition relative cursor-pointer ${
                  selected.includes(item.id) ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => toggleSelect(item.id)}
              >
                {/* Προεπισκόπηση */}
                <div className="h-40 bg-gray-100">
                  {item.type.startsWith("image/") ? (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      {item.type}
                    </div>
                  )}
                </div>

                {/* Στοιχεία */}
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(item.size)} ·{" "}
                    {item.createdAt &&
                      new Date(item.createdAt).toLocaleDateString("el-GR")}
                  </p>
                </div>

                {/* Διαγραφή */}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
}