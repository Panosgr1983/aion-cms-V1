"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const getBreadcrumbLabel = (segment: string, index: number): string => {
    if (/^[0-9]+$/.test(segment) || (index > 0 && segments[index - 1] === "edit")) return "";

    const labels: Record<string, string> = {
      admin: "AION",
      dashboard: "Dashboard",
      products: "Προϊόντα",
      categories: "Κατηγορίες",
      media: "Πολυμέσα",
      edit: "Επεξεργασία",
      add: "Νέο",
      new: "Νέο",
    };

    return labels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  const getLinkHref = (seg: string, idx: number): string => {
    // Αν είναι "admin", το redirect πρέπει να πηγαίνει στο dashboard
    if (seg === "admin") return "/admin/dashboard";
    return "/" + segments.slice(0, idx + 1).join("/");
  };

  const breadcrumbs = segments.map((seg, idx) => {
    const label = getBreadcrumbLabel(seg, idx);
    if (!label) return null;

    const href = getLinkHref(seg, idx);
    const isLast = idx === segments.length - 1;

    return (
      <li key={href} className="flex items-center">
        {!isLast ? (
          <>
            <Link href={href} className="text-blue-600 hover:underline capitalize">
              {label}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
          </>
        ) : (
          <span className="capitalize text-gray-500 dark:text-gray-400">{label}</span>
        )}
      </li>
    );
  }).filter(Boolean);

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center">
        <li className="flex items-center">
          <Link href="/admin/dashboard" className="text-blue-600 hover:underline">
            Αρχική
          </Link>
          <span className="mx-2 text-gray-400">/</span>
        </li>
        {breadcrumbs}
      </ol>
    </nav>
  );
}