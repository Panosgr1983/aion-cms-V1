"use client";

// 📦 Hooks και components
import { useEffect, useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/admin/Breadcrumbs";
import AdminCard from "@/components/admin/cards/AdminCard";
// ✅ Ορισμός τύπου για κατηγορία
interface Category {
  id: number;
  name: string;
  slug: string;
  productCount: number;
}

export default function CategoriesPage() {
  // 🧠 Καταστάσεις: πλήρης λίστα, φιλτραρισμένη, φόρτωση, αναζήτηση
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 🚀 Φόρτωση δοκιμαστικών δεδομένων (θα αντικατασταθεί με fetch API στο μέλλον)
  useEffect(() => {
    const melisaCategories: Category[] = [
      { id: 1, name: "Ξηροί Καρποί", slug: "xiroi-karpoi", productCount: 12 },
      { id: 2, name: "Αποξηραμένα Φρούτα", slug: "apoxiremena-frouta", productCount: 9 },
      { id: 3, name: "Superfoods", slug: "superfoods", productCount: 5 },
      { id: 4, name: "Μπάρες και Granola", slug: "mpares-kai-granola", productCount: 4 },
      { id: 5, name: "Φρέσκοι Χυμοί", slug: "freskoi-xymoi", productCount: 6 },
      { id: 6, name: "Καφέδες", slug: "kafedes", productCount: 3 },
      { id: 7, name: "Κρασιά", slug: "krasia", productCount: 5 },
      { id: 8, name: "Καλάθια Δώρων", slug: "kalathia-doron", productCount: 4 },
      { id: 9, name: "Εποχιακά Γλυκά", slug: "epoxiaka-glyka", productCount: 2 },
      { id: 10, name: "Βελγικές Τρούφες", slug: "velgikes-troufes", productCount: 3 },
      { id: 11, name: "Γλυκά του Κουταλιού", slug: "glyka-tou-koutaliou", productCount: 2 },
      { id: 12, name: "Μαρμελάδες", slug: "marmelades", productCount: 3 },
      { id: 13, name: "Μέλια", slug: "melia", productCount: 6 },
      { id: 14, name: "Παραδοσιακά Γλυκά", slug: "paradosiaka-glyka", productCount: 5 },
      { id: 15, name: "Κάβα Ποτών", slug: "kava-poton", productCount: 7 },
    ];

    // ⏳ Προσομοίωση καθυστέρησης API
    const timer = setTimeout(() => {
      setCategories(melisaCategories);
      setFilteredCategories(melisaCategories);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 🔍 Ενημέρωση φιλτραρισμένης λίστας βάσει όρου αναζήτησης
  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  // 🗑️ Διαγραφή κατηγορίας με επιβεβαίωση
  const handleDelete = (id: number) => {
    if (confirm("Θέλετε σίγουρα να διαγράψετε αυτή την κατηγορία;")) {
      const updated = categories.filter((c) => c.id !== id);
      setCategories(updated);
      setFilteredCategories(updated);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* 🧭 Breadcrumbs */}
      <Breadcrumbs />

      {/* ✅ Κεφαλίδα σελίδας και CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Κατηγορίες Προϊόντων</h1>
        <Link
          href="/admin/categories/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Νέα Κατηγορία
        </Link>
      </div>

      {/* 🔍 Πεδίο αναζήτησης */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Αναζήτηση κατηγορίας..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 💡 Εμφάνιση αποτελεσμάτων */}
        {searchTerm && (
          <div className="mt-2 text-sm text-gray-600">
            Βρέθηκαν {filteredCategories.length} από {categories.length} κατηγορίες
          </div>
        )}
      </div>

      {/* ⏳ Ενδείξεις φόρτωσης ή περιεχόμενο */}
      {loading ? (
        <div className="flex justify-center items-center text-gray-500 py-16">
          <span className="animate-spin mr-3 h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></span>
          Φόρτωση κατηγοριών...
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg mb-2">Δεν βρέθηκαν κατηγορίες για την αναζήτησή σας</p>
          <button
            onClick={() => setSearchTerm("")}
            className="text-blue-600 hover:underline"
          >
            Καθαρισμός αναζήτησης
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase">Όνομα</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase hidden sm:table-cell">Slug</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase">Προϊόντα</th>
                <th className="px-6 py-3 text-right font-semibold text-gray-600 uppercase">Ενέργειες</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-blue-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{category.name}</td>
                  <td className="px-6 py-4 text-gray-700 hidden sm:table-cell">{category.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                      category.productCount > 5 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }`}>
                      {category.productCount} προϊόντα
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link href={`/admin/categories/edit/${category.id}`} className="text-blue-600 hover:text-blue-800 text-sm">Επεξεργασία</Link>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Διαγραφή
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}