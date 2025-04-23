"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { mockFetchCategoryById, Category } from "@/app/lib/categoriesData";
import Breadcrumbs from "@/components/admin/Breadcrumbs";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params?.id as string, 10); // ✅ Χρήση useParams σωστά

  const [category, setCategory] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[άΆαΑ]/g, "a")
      .replace(/[έΈεΕ]/g, "e")
      .replace(/[ήΉηΗ]/g, "i")
      .replace(/[ίΊϊΐιΙ]/g, "i")
      .replace(/[όΌοΟ]/g, "o")
      .replace(/[ύΎϋΰυΥ]/g, "y")
      .replace(/[ώΏωΩ]/g, "o")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9\-]/g, "");

  useEffect(() => {
    if (!id || isNaN(id)) return;

    mockFetchCategoryById(id).then((data) => {
      if (data) {
        setCategory(data);
        setName(data.name);
        setSlug(data.slug);
        setImagePreview(data.image || null);
      }
      setLoading(false);
    });
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const updatedCategory = {
        ...category,
        name,
        slug: slug || generateSlug(name),
        image: imagePreview,
      };

      console.log("🚀 Updated Category:", updatedCategory);
      setSuccess(true);
      showConfetti();

      setTimeout(() => {
        router.push("/admin/categories");
      }, 1500);

      setLoading(false);
    }, 800);
  };

  const showConfetti = () => {
    const confetti = document.createElement("div");
    confetti.innerText = "🎉";
    confetti.style.position = "fixed";
    confetti.style.fontSize = "3rem";
    confetti.style.top = "50%";
    confetti.style.left = "50%";
    confetti.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1200);
  };

  if (loading) return <div className="text-center py-10 text-gray-500">Φόρτωση...</div>;
  if (!category) return <div className="text-center py-10 text-red-500">Η κατηγορία δεν βρέθηκε.</div>;

  return (
    <div className="max-w-2xl mx-auto my-10 px-4">
      <Breadcrumbs />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Επεξεργασία Κατηγορίας</h1>

      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md">
          ✅ Η κατηγορία ενημερώθηκε με επιτυχία!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Όνομα Κατηγορίας</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSlug(generateSlug(e.target.value));
            }}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
          <input
            value={slug}
            onChange={(e) => setSlug(generateSlug(e.target.value))}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Εικόνα</label>
          <div className="flex items-center gap-4">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded border"
              />
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
          >
            Ακύρωση
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 text-white rounded ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Αποθήκευση..." : "Αποθήκευση"}
          </button>
        </div>
      </form>
    </div>
  );
}