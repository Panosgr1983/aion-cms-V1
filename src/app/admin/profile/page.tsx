"use client";

import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/admin/Breadcrumbs";
import AdminCard from "@/components/admin/cards/AdminCard";
import { useTheme } from "@/components/theme/ThemeProvider";
import { showConfetti } from "@/lib/utils/showConfetti";

// src/app/admin/profile/page.tsx
import dynamic from "next/dynamic";

const ProfilePage = dynamic(() => import("@/components/admin/pages/ProfilePage"), { ssr: false });

export default function Page() {
  return <ProfilePage />;
}

// Τύπος για το προφίλ χρήστη
interface UserProfile {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  phone?: string;
  bio?: string;
  language: string;
  notificationPreferences: {
    email: boolean;
    browser: boolean;
    system: boolean;
  };
  lastLogin: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'general'|'security'|'preferences'>('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  // Προσομοίωση φόρτωσης προφίλ από API
  const [profile, setProfile] = useState<UserProfile>({
    id: "usr_12345",
    username: "admin",
    email: "admin@aion-cms.com",
    fullName: "Διαχειριστής Συστήματος",
    role: "admin",
    avatar: "https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff",
    phone: "+30 210 1234567",
    bio: "Κύριος διαχειριστής του AION CMS με πλήρη δικαιώματα συστήματος.",
    language: "el",
    notificationPreferences: {
      email: true,
      browser: true,
      system: false
    },
    lastLogin: "2025-04-22T10:30:00Z",
    createdAt: "2024-12-10T09:00:00Z"
  });

  // Χειρισμός αλλαγών στα πεδία
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Διαχείριση nested αντικειμένων
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      const parentKey = parent as keyof UserProfile;
      
      setProfile({
        ...profile,
        [parentKey]: {
          ...(profile[parentKey] as Record<string, any>),
          [child]: value
        }
      });
    } else {
      setProfile({
        ...profile,
        [name]: value
      });
    }
  };

  // Χειρισμός αλλαγών σε checkboxes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    // Διαχείριση nested αντικειμένων
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      const parentKey = parent as keyof UserProfile;
      
      setProfile({
        ...profile,
        [parentKey]: {
          ...(profile[parentKey] as Record<string, any>),
          [child]: checked
        }
      });
    } else {
      setProfile({
        ...profile,
        [name]: checked
      });
    }
  };

  // Χειρισμός αλλαγής avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Χειρισμός υποβολής φόρμας
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Προσομοίωση αποθήκευσης σε API
    setTimeout(() => {
      if (avatarPreview) {
        setProfile({
          ...profile,
          avatar: avatarPreview
        });
      }
      
      setIsSaving(false);
      setSaveSuccess(true);
      showConfetti();
      
      // Καθαρισμός μηνύματος επιτυχίας μετά από λίγο
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 800);
  };

  // Χειρισμός αλλαγής κωδικού
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Προσομοίωση αποθήκευσης σε API
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      showConfetti();
      
      // Καθαρισμός μηνύματος επιτυχίας και πεδίων
      setTimeout(() => {
        setSaveSuccess(false);
        // Καθαρισμός πεδίων κωδικού
        const passwordForm = document.getElementById('password-form') as HTMLFormElement;
        if (passwordForm) passwordForm.reset();
      }, 3000);
    }, 800);
  };

  // Περιεχόμενο καρτέλας βάσει της ενεργής καρτέλας
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            {/* Avatar Επιλογή */}
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
              <div className="relative">
                <img 
                  src={avatarPreview || profile.avatar || "https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff"}
                  alt="Προφίλ"
                  className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md"
                />
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-700 transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input 
                    id="avatar-upload" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleAvatarChange} 
                    className="hidden" 
                  />
                </label>
              </div>
              
              <div className="space-y-4 flex-1">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                    Ονοματεπώνυμο
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={profile.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium mb-1">
                    Σύντομο Βιογραφικό
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profile.bio || ""}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-1">
                  Όνομα Χρήστη
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={profile.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Τηλέφωνο
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profile.phone || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="+30 210 1234567"
                />
              </div>
              
              <div>
                <label htmlFor="language" className="block text-sm font-medium mb-1">
                  Γλώσσα
                </label>
                <select
                  id="language"
                  name="language"
                  value={profile.language}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="el">Ελληνικά</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Στοιχεία Λογαριασμού</h3>
                <span className="px-3 py-1 inline-flex text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {profile.role === 'admin' ? 'Διαχειριστής' : 
                   profile.role === 'editor' ? 'Συντάκτης' : 'Επισκέπτης'}
                </span>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-gray-500">ID Χρήστη</span>
                  <span>{profile.id}</span>
                </div>
                <div>
                  <span className="block text-gray-500">Τελευταία Σύνδεση</span>
                  <span>{new Date(profile.lastLogin).toLocaleString('el-GR')}</span>
                </div>
                <div>
                  <span className="block text-gray-500">Ημερομηνία Δημιουργίας</span>
                  <span>{new Date(profile.createdAt).toLocaleString('el-GR')}</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="space-y-6">
            <form id="password-form" onSubmit={handlePasswordChange} className="space-y-6">
              <h3 className="text-lg font-medium">Αλλαγή Κωδικού</h3>
              
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                  Τρέχων Κωδικός
                </label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                  Νέος Κωδικός
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες με γράμματα, αριθμούς και σύμβολα.
                </p>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Επιβεβαίωση Νέου Κωδικού
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`px-4 py-2 rounded-md text-white transition ${
                    isSaving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isSaving ? 'Αποθήκευση...' : 'Αλλαγή Κωδικού'}
                </button>
              </div>
            </form>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">Ασφάλεια Λογαριασμού</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="twoFactorAuth"
                      name="twoFactorAuth"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="twoFactorAuth" className="font-medium">
                      Ενεργοποίηση Two-Factor Authentication (2FA)
                    </label>
                    <p className="text-gray-500">
                      Ενισχύστε την ασφάλεια του λογαριασμού σας απαιτώντας έναν κωδικό επαλήθευσης μιας χρήσης κατά τη σύνδεση.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="notifyLogin"
                      name="notifyLogin"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="notifyLogin" className="font-medium">
                      Ειδοποίηση για νέες συνδέσεις
                    </label>
                    <p className="text-gray-500">
                      Λήψη ειδοποίησης όταν ο λογαριασμός σας συνδέεται από μια νέα συσκευή ή τοποθεσία.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-2 text-red-600">Επικίνδυνη Ζώνη</h3>
              
              <p className="text-sm text-gray-500 mb-4">
                Οι ενέργειες σε αυτήν την ενότητα είναι μη αναστρέψιμες και θα πρέπει να γίνονται με προσοχή.
              </p>
              
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Διαγραφή Λογαριασμού
              </button>
            </div>
          </div>
        );
      
      case 'preferences':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Ειδοποιήσεις</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="notificationPreferences.email"
                    name="notificationPreferences.email"
                    type="checkbox"
                    checked={profile.notificationPreferences.email}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="notificationPreferences.email" className="font-medium">
                    Ειδοποιήσεις μέσω Email
                  </label>
                  <p className="text-gray-500">
                    Λήψη ειδοποιήσεων για ενημερώσεις και δραστηριότητες του συστήματος στο email σας.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="notificationPreferences.browser"
                    name="notificationPreferences.browser"
                    type="checkbox"
                    checked={profile.notificationPreferences.browser}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="notificationPreferences.browser" className="font-medium">
                    Ειδοποιήσεις προγράμματος περιήγησης
                  </label>
                  <p className="text-gray-500">
                    Λήψη push ειδοποιήσεων στο πρόγραμμα περιήγησής σας όταν είστε online.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="notificationPreferences.system"
                    name="notificationPreferences.system"
                    type="checkbox"
                    checked={profile.notificationPreferences.system}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="notificationPreferences.system" className="font-medium">
                    Ειδοποιήσεις συστήματος
                  </label>
                  <p className="text-gray-500">
                    Λήψη ειδοποιήσεων για ζητήματα ασφαλείας και κρίσιμες ενημερώσεις.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">Προτιμήσεις Απεικόνισης</h3>
              
              <div>
                <label htmlFor="uiDensity" className="block text-sm font-medium mb-1">
                  Πυκνότητα Διεπαφής
                </label>
                <select
                  id="uiDensity"
                  name="uiDensity"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="compact">Συμπαγής</option>
                  <option value="normal" selected>Κανονική</option>
                  <option value="comfortable">Άνετη</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  Προσαρμόστε πόσο συμπαγής εμφανίζεται το περιεχόμενο στη διεπαφή.
                </p>
              </div>
              
              <div className="mt-4">
                <label htmlFor="dateFormat" className="block text-sm font-medium mb-1">
                  Μορφή Ημερομηνίας
                </label>
                <select
                  id="dateFormat"
                  name="dateFormat"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="dd/mm/yyyy">ΗΗ/ΜΜ/ΕΕΕΕ (30/04/2025)</option>
                  <option value="mm/dd/yyyy">ΜΜ/ΗΗ/ΕΕΕΕ (04/30/2025)</option>
                  <option value="yyyy-mm-dd">ΕΕΕΕ-ΜΜ-ΗΗ (2025-04-30)</option>
                </select>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">Εξαγωγή Δεδομένων</h3>
              
              <p className="text-sm text-gray-500 mb-4">
                Εξαγωγή των προσωπικών σας δεδομένων σε μορφή CSV ή JSON.
              </p>
              
              <div className="space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                >
                  Εξαγωγή ως CSV
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                >
                  Εξαγωγή ως JSON
                </button>
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
          Το Προφίλ μου
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
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Γενικές Πληροφορίες
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-3 text-left ${
                activeTab === 'security' 
                  ? 'bg-blue-50 border-l-4 border-blue-500 dark:bg-gray-700 dark:border-blue-400 font-medium text-blue-600 dark:text-blue-400' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Ασφάλεια
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('preferences')}
              className={`px-4 py-3 text-left ${
                activeTab === 'preferences' 
                  ? 'bg-blue-50 border-l-4 border-blue-500 dark:bg-gray-700 dark:border-blue-400 font-medium text-blue-600 dark:text-blue-400' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
  <path
    fillRule="evenodd"
    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
    clipRule="evenodd"
  />
</svg>
                Προτιμήσεις
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
                    <p>Οι αλλαγές αποθηκεύτηκαν επιτυχώς!</p>
                  </div>
                </div>
              )}
              
              {/* Περιεχόμενο ενεργής καρτέλας */}
              {renderTabContent()}
              
              {/* Κουμπιά φόρμας (εμφανίζονται μόνο στο General tab) */}
              {activeTab === 'general' && (
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
              )}
              
              {/* Κουμπιά φόρμας για τις Προτιμήσεις */}
              {activeTab === 'preferences' && (
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
                    {isSaving ? 'Αποθήκευση...' : 'Αποθήκευση'}
                  </button>
                </div>
              )}
            </form>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}