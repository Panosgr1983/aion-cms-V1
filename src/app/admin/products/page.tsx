"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/admin/Breadcrumbs";
import AdminCard from "@/components/admin/cards/AdminCard";

interface Product {
  id: number;
  name: string;
  price: number;
  category?: string;
  image?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sample: Product[] = [
      { id: 1, name: "Καραμελωμένα Αμύγδαλα", price: 6.5, category: "Ξηροί Καρποί" },
      { id: 2, name: "Αμύγδαλα με Κακάο", price: 7.0, category: "Ξηροί Καρποί" },
      { id: 3, name: "Καρύδια", price: 6.9, category: "Ξηροί Καρποί" },
      { id: 4, name: "Αποξηραμένα Βερίκοκα", price: 5.5, category: "Αποξηραμένα Φρούτα" },
      { id: 5, name: "Αποξηραμένα Μάνγκο", price: 7.0, category: "Αποξηραμένα Φρούτα" },
      { id: 6, name: "Chia Seeds", price: 8.5, category: "Superfoods" },
      { id: 7, name: "Spirulina Powder", price: 9.99, category: "Superfoods" },
      { id: 8, name: "Granola με Μύρτιλλα", price: 4.99, category: "Μπάρες και Granola" },
      { id: 9, name: "Μπάρα Ενέργειας Με Σοκολάτα", price: 2.5, category: "Μπάρες και Granola" },
      { id: 10, name: "Χυμός Πορτοκάλι", price: 3.0, category: "Φρέσκοι Χυμοί" },
      { id: 11, name: "Χυμός Καρότο", price: 3.2, category: "Φρέσκοι Χυμοί" },
      { id: 12, name: "Καφές Espresso", price: 4.5, category: "Καφέδες" },
      { id: 13, name: "Καφές Φίλτρου", price: 3.5, category: "Καφέδες" },
      { id: 14, name: "Κρασί Ροζέ", price: 12.99, category: "Κρασιά" },
      { id: 15, name: "Κρασί Ερυθρό", price: 14.5, category: "Κρασιά" },
    ];

    const timer = setTimeout(() => {
      setProducts(sample);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Προϊόντα</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Νέο Προϊόν
        </Link>
      </div>

      <div>
        <input
          type="text"
          placeholder="Αναζήτηση προϊόντων..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <AdminCard title="Λίστα Προϊόντων">
        {loading ? (
          <div className="text-center py-6 text-gray-500">Φόρτωση προϊόντων...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Προϊόν</th>
                <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Κατηγορία</th>
                <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Τιμή</th>
                <th className="px-6 py-3 text-right font-medium text-gray-600 uppercase tracking-wider">Ενέργειες</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {product.category || "Χωρίς κατηγορία"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{product.price.toFixed(2)} €</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Επεξεργασία
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm("Θέλετε σίγουρα να διαγράψετε αυτό το προϊόν;")) {
                          setProducts((prev) => prev.filter((p) => p.id !== product.id));
                        }
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Διαγραφή
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-6 text-gray-400">
            Δεν βρέθηκαν προϊόντα που να ταιριάζουν στην αναζήτησή σας.
          </div>
        )}
      </AdminCard>
    </div>
  );
}