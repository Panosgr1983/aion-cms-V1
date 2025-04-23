"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/admin/Breadcrumbs";
import AdminCard from "@/components/admin/cards/AdminCard";
import { showConfetti } from "@/lib/utils/showConfetti";


// Dummy interface για το media library
interface MediaItem {
  id: string;
  name: string;
  url: string;
}

// 🔥 ΑION ULTRA EDITION - Νέο προϊόν με όλα
export default function NewProduct() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [filePreview, setFilePreview] = useState("");

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // Auto-generate slug
  useEffect(() => {
    if (!slugManuallyEdited) {
      const newSlug = name
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      setSlug(newSlug);
    }
  }, [name]);

  // Demo media library preload
  useEffect(() => {
    setMediaLibrary([
      {
        id: "1",
        name: "almonds.jpg",
        url: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
      },
      {
        id: "2",
        name: "mango.jpg",
        url: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample2.jpg",
      },
    ]);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImageUrl("");
      setFilePreview(previewUrl);
    }
  };

  const handleImageSelect = (url: string) => {
    setFilePreview("");
    setImageUrl(url);
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setSlugManuallyEdited(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !category || !price) {
      setError("Όλα τα υποχρεωτικά πεδία πρέπει να συμπληρωθούν.");
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      setError("Η τιμή πρέπει να είναι θετικός αριθμός.");
      return;
    }

    const newProduct = {
      name,
      slug,
      category,
      price: priceValue,
      description,
      image: imageUrl || filePreview || "default.jpg",
    };

    console.log("🆕 Demo προϊόν:", newProduct);

    setSuccess(true);
    setTimeout(() => {
      router.push("/admin/products");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 mt-10 px-4">
      <Breadcrumbs />
      <AdminCard title="Προσθήκη Νέου Προϊόντος">
        {error && (
          <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>
        )}
        {success && (
          <div className="mb-4 bg-green-100 text-green-800 px-4 py-2 rounded font-medium">
            ✅ Το προϊόν αποθηκεύτηκε επιτυχώς!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Όνομα */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Όνομα Προϊόντος <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="text-sm font-medium text-gray-700 flex justify-between">
              Slug URL
              {slugManuallyEdited && ( 
                <button
                  type="button"
                  className="text-xs text-blue-600 hover:underline"
                  onClick={() => {
                    setSlugManuallyEdited(false);
                    const autoSlug = name
                      .toLowerCase()
                      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                      .replace(/[^\w\s-]/g, "")
                      .trim()
                      .replace(/\s+/g, "-");
                    setSlug(autoSlug);
                  }}
                >
                  Επαναφορά αυτόματου
                </button>
              )}
            </label>
            <input
              id="slug"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
              value={slug}
              onChange={handleSlugChange}
            />
            <p className="text-xs text-gray-500 mt-1">Χρησιμοποιείται στο URL του προϊόντος.</p>
          </div>

          {/* Κατηγορία */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Κατηγορία <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Επιλέξτε κατηγορία</option>
              <option value="Ξηροί Καρποί">Ξηροί Καρποί</option>
              <option value="Αποξηραμένα Φρούτα">Αποξηραμένα Φρούτα</option>
              <option value="Superfoods">Superfoods</option>
              <option value="Καφέδες">Καφέδες</option>
              <option value="Κρασιά">Κρασιά</option>
              <option value="Μπάρες και Granola">Μπάρες και Granola</option>
              <option value="Φρέσκοι Χυμοί">Φρέσκοι Χυμοί</option>
            </select>
          </div>

          {/* Τιμή */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Τιμή (€) <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Περιγραφή */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Περιγραφή
            </label>
            <textarea
              id="description"
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Προαιρετική περιγραφή για SEO, eshop κ.λπ."
            />
          </div>

          {/* Εικόνα */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Εικόνα Προϊόντος
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm"
            />

            <div className="flex gap-3 mt-2 overflow-x-auto">
              {mediaLibrary.map((media) => (
                <img
                  key={media.id}
                  src={media.url}
                  alt={media.name}
                  className={`w-16 h-16 object-cover rounded border cursor-pointer ${
                    imageUrl === media.url ? "ring-2 ring-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => handleImageSelect(media.url)}
                />
              ))}
            </div>

            {(imageUrl || filePreview) && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-1">Προεπισκόπηση:</p>
                <img
                  src={imageUrl || filePreview}
                  alt="preview"
                  className="w-32 h-32 rounded object-cover border"
                />
              </div>
            )}
          </div>

          {/* Υποβολή */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
          >
            Αποθήκευση Προϊόντος
          </button>
        </form>
      </AdminCard>
    </div>
  );
}