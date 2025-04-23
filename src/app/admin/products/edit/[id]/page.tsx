"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Breadcrumbs from "@/components/admin/Breadcrumbs";
import AdminCard from "@/components/admin/cards/AdminCard";
import { showConfetti } from "@/lib/utils/showConfetti";

interface MediaItem {
  id: string;
  name: string;
  url: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  description?: string;
  image?: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id") || "1"; // Demo μόνο

  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [filePreview, setFilePreview] = useState("");

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([]);

  
  useEffect(() => {
    // 🔁 Προσομοίωση fetch προϊόντος
    const fetchProduct = async () => {
      const fetched: Product = {
        id: Number(productId),
        name: "Καραμελωμένα Αμύγδαλα",
        slug: "karamelomena-amygdala",
        category: "Ξηροί Καρποί",
        price: 6.5,
        description: "Νόστιμα και τραγανά!",
        image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
      };
      setProduct(fetched);
      setName(fetched.name);
      setSlug(fetched.slug);
      setCategory(fetched.category);
      setPrice(String(fetched.price));
      setDescription(fetched.description || "");
      setImageUrl(fetched.image || "");
    };

    // 📸 Dummy εικόνες
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

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (!slugManuallyEdited) {
      const newSlug = name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      setSlug(newSlug);
    }
  }, [name]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const priceValue = parseFloat(price);
    if (!name || !category || isNaN(priceValue) || priceValue <= 0) return;

    const updated: Product = {
      id: Number(productId),
      name,
      slug,
      category,
      price: priceValue,
      description,
      image: imageUrl || filePreview || "default.jpg",
    };

    console.log("📝 Προϊόν ανανεώθηκε (demo):", updated);
    setSuccess(true);
    setTimeout(() => router.push("/admin/products"), 1500);
  };

  if (!product) return <p className="text-center py-10">Φόρτωση προϊόντος...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <Breadcrumbs />
      <AdminCard title="Επεξεργασία Προϊόντος">
        {success && (
          <div className="mb-4 bg-green-100 text-green-800 px-4 py-2 rounded">
            ✅ Το προϊόν αποθηκεύτηκε επιτυχώς!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Όνομα</label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="flex justify-between font-medium mb-1">
              Slug
              {slugManuallyEdited && (
                <button
                  type="button"
                  onClick={() => {
                    setSlugManuallyEdited(false);
                    const autoSlug = name
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/[^\w\s-]/g, "")
                      .trim()
                      .replace(/\s+/g, "-");
                    setSlug(autoSlug);
                  }}
                  className="text-blue-600 text-xs hover:underline"
                >
                  Επαναφορά
                </button>
              )}
            </label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={slug}
              onChange={handleSlugChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Κατηγορία</label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Τιμή (€)</label>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Περιγραφή</label>
            <textarea
              className="w-full border px-3 py-2 rounded"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Εικόνα Προϊόντος</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            <div className="flex gap-3 mt-3 overflow-x-auto">
              {mediaLibrary.map((media) => (
                <img
                  key={media.id}
                  src={media.url}
                  alt={media.name}
                  className={`w-16 h-16 object-cover rounded cursor-pointer border ${
                    imageUrl === media.url ? "ring-2 ring-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => handleImageSelect(media.url)}
                />
              ))}
            </div>

            {(imageUrl || filePreview) && (
              <img
                src={imageUrl || filePreview}
                alt="preview"
                className="w-32 h-32 rounded mt-4 object-cover border"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Αποθήκευση Αλλαγών
          </button>
        </form>
      </AdminCard>
    </div>
  );
}