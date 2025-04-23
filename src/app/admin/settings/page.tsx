"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/admin/Breadcrumbs";
import AdminCard from "@/components/admin/cards/AdminCard";
import { useTheme } from "@/components/theme/ThemeProvider";
import { showConfetti } from "@/lib/utils/showConfetti";

// Τύπος για τις ρυθμίσεις
interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  enableDarkMode: boolean;
  currency: string;
  showPricesWithTax: boolean;
  vatRate: number;
  logoUrl: string;
  faviconUrl: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  analytics: {
    googleAnalyticsId: string;
    enabledTracking: boolean;
  };
  }


export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'general'|'shop'|'appearance'|'users'|'seo'>('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Προσομοίωση φόρτωσης ρυθμίσεων από API
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "AION E-Shop",
    siteDescription: "Προϊόντα υψηλής ποιότητας για όλους",
    contactEmail: "info@aion-shop.gr",
    enableDarkMode: false,
    currency: "EUR",
    showPricesWithTax: true,
    vatRate: 24,
    logoUrl: "/logo.png",
    faviconUrl: "/favicon.ico",
    socialLinks: {
      facebook: "https://facebook.com/aionshop",
      instagram: "https://instagram.com/aionshop",
      twitter: "https://twitter.com/aionshop"
    },
    analytics: {
      googleAnalyticsId: "G-XXXXXXXXXX",
      enabledTracking: true
    }
  });

  // Χειρισμός αλλαγών στα πεδία
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Διαχείριση nested αντικειμένων
if (name.includes('.')) {
  const [parent, child] = name.split('.');
  
  // Βεβαιωνόμαστε ότι το parent είναι κλειδί του SiteSettings
  const parentKey = parent as keyof SiteSettings;
  
  // Χρησιμοποιούμε type assertion για να διασφαλίσουμε ότι το TypeScript ξέρει ότι είναι αντικείμενο
  setSettings({
    ...settings,
    [parentKey]: {
      ...(settings[parentKey] as Record<string, any>),
      [child]: value
    }
  });
} else {
  setSettings({
    ...settings,
    [name]: value
  });
}
}; // <- Αυτό το κλείσιμο έλειπε
  // Χειρισμός αλλαγών σε checkboxes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
   // Διαχείριση nested αντικειμένων για checkboxes
if (name.includes('.')) {
  const [parent, child] = name.split('.');
  
  // Βεβαιωνόμαστε ότι το parent είναι κλειδί του SiteSettings
  const parentKey = parent as keyof SiteSettings;
  
  // Χρησιμοποιούμε type assertion για να διασφαλίσουμε ότι το TypeScript αναγνωρίζει το αντικείμενο
  setSettings({
    ...settings,
    [parentKey]: {
      ...(settings[parentKey] as Record<string, any>),
      [child]: checked
    }
  });
} else {
  setSettings({
    ...settings,
    [name]: checked
  });
}
}; // <- Αυτό το κλείσιμο έλειπε

  // Χειρισμός υποβολής φόρμας
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Προσομοίωση αποθήκευσης σε API
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      showConfetti();
      
      // Καθαρισμός μηνύματος επιτυχίας μετά από λίγο
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 800);
  };

  // Περιεχόμενο καρτέλας βάσει της ενεργής καρτέλας
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium mb-1">
                Όνομα Ιστότοπου
              </label>
              <input
                id="siteName"
                name="siteName"
                type="text"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="siteDescription" className="block text-sm font-medium mb-1">
                Περιγραφή Ιστότοπου
              </label>
              <textarea
                id="siteDescription"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium mb-1">
                Email Επικοινωνίας
              </label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium mb-3">Κοινωνικά Δίκτυα</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="socialLinks.facebook" className="block text-sm font-medium mb-1">
                    Facebook
                  </label>
                  <input
                    id="socialLinks.facebook"
                    name="socialLinks.facebook"
                    type="url"
                    value={settings.socialLinks.facebook}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="socialLinks.instagram" className="block text-sm font-medium mb-1">
                    Instagram
                  </label>
                  <input
                    id="socialLinks.instagram"
                    name="socialLinks.instagram"
                    type="url"
                    value={settings.socialLinks.instagram}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="socialLinks.twitter" className="block text-sm font-medium mb-1">
                    Twitter
                  </label>
                  <input
                    id="socialLinks.twitter"
                    name="socialLinks.twitter"
                    type="url"
                    value={settings.socialLinks.twitter}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'shop':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="currency" className="block text-sm font-medium mb-1">
                Νόμισμα
              </label>
              <select
                id="currency"
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="EUR">Euro (€)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                id="showPricesWithTax"
                name="showPricesWithTax"
                type="checkbox"
                checked={settings.showPricesWithTax}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label htmlFor="showPricesWithTax" className="ml-2 block text-sm font-medium">
                Εμφάνιση τιμών με ΦΠΑ
              </label>
            </div>
            
            <div>
              <label htmlFor="vatRate" className="block text-sm font-medium mb-1">
                Συντελεστής ΦΠΑ (%)
              </label>
              <input
                id="vatRate"
                name="vatRate"
                type="number"
                min="0"
                max="100"
                value={settings.vatRate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium mb-3">Analytics</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="analytics.googleAnalyticsId" className="block text-sm font-medium mb-1">
                    Google Analytics ID
                  </label>
                  <input
                    id="analytics.googleAnalyticsId"
                    name="analytics.googleAnalyticsId"
                    type="text"
                    value={settings.analytics.googleAnalyticsId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    id="analytics.enabledTracking"
                    name="analytics.enabledTracking"
                    type="checkbox"
                    checked={settings.analytics.enabledTracking}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <label htmlFor="analytics.enabledTracking" className="ml-2 block text-sm font-medium">
                    Ενεργοποίηση παρακολούθησης analytics
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="logoUrl" className="block text-sm font-medium mb-1">
                URL Λογότυπου
              </label>
              <div className="flex items-center gap-4">
                {settings.logoUrl && (
                  <img
                    src={settings.logoUrl}
                    alt="Logo Preview"
                    className="h-10 w-auto object-contain border rounded p-1"
                  />
                )}
                <input
                  id="logoUrl"
                  name="logoUrl"
                  type="text"
                  value={settings.logoUrl}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded"
                >
                  Επιλογή
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="faviconUrl" className="block text-sm font-medium mb-1">
                URL Favicon
              </label>
              <div className="flex items-center gap-4">
                {settings.faviconUrl && (
                  <img
                    src={settings.faviconUrl}
                    alt="Favicon Preview"
                    className="h-8 w-auto object-contain border rounded p-1"
                  />
                )}
                <input
                  id="faviconUrl"
                  name="faviconUrl"
                  type="text"
                  value={settings.faviconUrl}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded"
                >
                  Επιλογή
                </button>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium mb-3">Εμφάνιση</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                  <div>
                    <h4 className="font-medium">Λειτουργία Σκοτεινού Θέματος</h4>
                    <p className="text-sm text-gray-500">Επιλέξτε το προεπιλεγμένο θέμα του ιστότοπου</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setTheme("light")}
                      className={`px-3 py-1 rounded-md ${
                        theme === "light" 
                          ? "bg-blue-600 text-white" 
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      Φωτεινό
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme("dark")}
                      className={`px-3 py-1 rounded-md ${
                        theme === "dark" 
                          ? "bg-blue-600 text-white" 
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      Σκοτεινό
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme("system")}
                      className={`px-3 py-1 rounded-md ${
                        theme === "system" 
                          ? "bg-blue-600 text-white" 
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      Συστήματος
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'users':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Περιορισμένη Πρόσβαση
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Οι ρυθμίσεις χρηστών είναι διαθέσιμες μόνο για το ρόλο του Διαχειριστή. 
                      Επικοινωνήστε με τον κύριο διαχειριστή για αλλαγές στους λογαριασμούς χρηστών.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Όνομα
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ρόλος
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Κατάσταση
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Επεξεργασία</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-500">Α</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">Admin User</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">admin@aion-cms.com</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Διαχειριστής
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Ενεργός
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button type="button" className="text-indigo-600 hover:text-indigo-900 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                        Επεξεργασία
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-500">E</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">Editor User</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">editor@aion-cms.com</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Συντάκτης
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Ενεργός
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button type="button" className="text-indigo-600 hover:text-indigo-900">
                        Επεξεργασία
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-500">V</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">Viewer User</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">viewer@aion-cms.com</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Επισκέπτης
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Σε αναμονή
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button type="button" className="text-indigo-600 hover:text-indigo-900">
                        Επεξεργασία
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
        
      case 'seo':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="metaTitle" className="block text-sm font-medium mb-1">
                Προεπιλεγμένος Meta Title
              </label>
              <input
                id="metaTitle"
                name="metaTitle"
                type="text"
                placeholder="AION CMS - Ηλεκτρονικό Κατάστημα"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <p className="mt-1 text-sm text-gray-500">
                Συνιστώμενο μήκος: 50-60 χαρακτήρες
              </p>
            </div>
            
            <div>
              <label htmlFor="metaDescription" className="block text-sm font-medium mb-1">
                Προεπιλεγμένο Meta Description
              </label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                rows={3}
                placeholder="Το AION CMS προσφέρει προϊόντα υψηλής ποιότητας σε ανταγωνιστικές τιμές."
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <p className="mt-1 text-sm text-gray-500">
                Συνιστώμενο μήκος: 150-160 χαρακτήρες
              </p>
            </div>
            
            <div>
              <label htmlFor="ogImage" className="block text-sm font-medium mb-1">
                Προεπιλεγμένη Open Graph Εικόνα
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="ogImage"
                  name="ogImage"
                  type="text"
                  placeholder="/images/og-image.jpg"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded"
                >
                  Επιλογή
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Προτεινόμενο μέγεθος: 1200x630 pixels
              </p>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium mb-3">Δομημένα Δεδομένα</h3>
              
              <div className="flex items-center mb-4">
                <input
                  id="enableStructuredData"
                  name="enableStructuredData"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <label htmlFor="enableStructuredData" className="ml-2 block text-sm font-medium">
                  Ενεργοποίηση Schema.org
                </label>
              </div>
              
              <div>
                <label htmlFor="businessType" className="block text-sm font-medium mb-1">
                  Τύπος Επιχείρησης
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Store">Κατάστημα</option>
                  <option value="Restaurant">Εστιατόριο</option>
                  <option value="LocalBusiness">Τοπική Επιχείρηση</option>
                  <option value="Organization">Οργανισμός</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          Ρυθμίσεις
        </h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar με τις καρτέλες */}
        <div className="w-full md:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <nav className="flex flex-col">
            <button
              onClick={() => setActiveTab('general')}
              className={`px-4 py-3 text-left ${
                activeTab === 'general' 
                  ? 'bg-blue-50 border-l-4 border-blue-500 dark:bg-gray-700 dark:border-blue-400 font-medium text-blue-600 dark:text-blue-400' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Γενικές Ρυθμίσεις
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('shop')}
              className={`px-4 py-3 text-left ${
                activeTab === 'shop' 
                  ? 'bg-blue-50 border-l-4 border-blue-500 dark:bg-gray-700 dark:border-blue-400 font-medium text-blue-600 dark:text-blue-400' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Ρυθμίσεις E-shop
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('appearance')}
              className={`px-4 py-3 text-left ${
                activeTab === 'appearance' 
                  ? 'bg-blue-50 border-l-4 border-blue-500 dark:bg-gray-700 dark:border-blue-400 font-medium text-blue-600 dark:text-blue-400' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" />
                </svg>
                Εμφάνιση
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-3 text-left ${
                activeTab === 'users' 
                  ? 'bg-blue-50 border-l-4 border-blue-500 dark:bg-gray-700 dark:border-blue-400 font-medium text-blue-600 dark:text-blue-400' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Χρήστες
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('seo')}
              className={`px-4 py-3 text-left ${
                activeTab === 'seo' 
                  ? 'bg-blue-50 border-l-4 border-blue-500 dark:bg-gray-700 dark:border-blue-400 font-medium text-blue-600 dark:text-blue-400' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                SEO
              </div>
            </button>
          </nav>
        </div>
        
        {/* Περιεχόμενο καρτέλας */}
        <div className="flex-1">
          <AdminCard>
            <form onSubmit={handleSubmit}>
              {/* Εμφάνιση επιτυχούς αποθήκευσης */}
              {saveSuccess && (
                <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 text-green-700">
                  <div className="flex">
                    <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p>Οι ρυθμίσεις αποθηκεύτηκαν επιτυχώς!</p>
                  </div>
                </div>
              )}
              
              {/* Περιεχόμενο ενεργής καρτέλας */}
              {renderTabContent()}
              
              {/* Κουμπιά φόρμας */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-8">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  Ακύρωση
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`px-4 py-2 rounded-md text-white transition ${
                    isSaving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isSaving ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Αποθήκευση...
                    </span>
                  ) : (
                    'Αποθήκευση'
                  )}
                </button>
              </div>
            </form>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}