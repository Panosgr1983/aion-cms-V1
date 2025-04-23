"use client";

import { useState } from "react";

type Product = {
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[]; // URLs from Cloudinary
};

type Props = {
  initialData?: Product;
  onSubmit: (data: Product) => void;
};

export default function ProductForm({ initialData, onSubmit }: Props) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price || 0);
  const [category, setCategory] = useState(initialData?.category || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [images, setImages] = useState<string[]>(initialData?.images || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, price, category, description, images });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{initialData ? "Επεξεργασία Προϊόντος" : "Προσθήκη Νέου Προϊόντος"}</h2>

      <input
        type="text"
        placeholder="Όνομα προϊόντος"
        className="w-full border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Τιμή (€)"
        className="w-full border p-2 rounded"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        required
      />

      <input
        type="text"
        placeholder="Κατηγορία"
        className="w-full border p-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <textarea
        placeholder="Περιγραφή προϊόντος"
        className="w-full border p-2 rounded h-32"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Προσωρινά placeholder για Cloudinary εικόνες */}
      <input
        type="text"
        placeholder="Cloudinary URL εικόνας"
        className="w-full border p-2 rounded"
        onChange={(e) => setImages([e.target.value])}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Αποθήκευση
      </button>
    </form>
  );
}