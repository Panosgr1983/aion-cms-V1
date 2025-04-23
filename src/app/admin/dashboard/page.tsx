"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/admin/cards/StatCard";
import AdminCard from "@/components/admin/cards/AdminCard";
import Breadcrumbs from "@/components/admin/Breadcrumbs";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    media: 0,
  });

  useEffect(() => {
    // 🔌 Συνδέσου με API στο μέλλον
    setStats({
      products: 24,
      categories: 8,
      media: 56,
    });
  }, []);

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Τίτλος */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
        Dashboard
      </h1>

      {/* Στατιστικά */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Προϊόντα" value={stats.products} />
        <StatCard title="Κατηγορίες" value={stats.categories} />
        <StatCard title="Αρχεία" value={stats.media} />
      </div>

      {/* Πρόσφατη Δραστηριότητα */}
      <AdminCard title="Πρόσφατη Δραστηριότητα">
        <p className="text-gray-500 dark:text-gray-400">
          Δεν υπάρχει καταγεγραμμένη δραστηριότητα ακόμα.
        </p>
      </AdminCard>
    </div>
  );
}