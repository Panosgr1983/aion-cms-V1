#!/bin/bash

echo "AION CMS Project Setup"
echo "====================="
echo ""

# Δημιουργία του βασικού project
echo "[1/12] Δημιουργία του Next.js project..."
#npx create-next-app@latest aion-cms --typescript --eslint --tailwind --src-dir --app --import-alias "@/*"
#cd aion-cms

# Εγκατάσταση επιπλέον πακέτων
echo "[2/12] Εγκατάσταση επιπλέον πακέτων..."
npm install clsx cloudinary

# Δημιουργία των φακέλων
echo "[3/12] Δημιουργία της δομής φακέλων..."
mkdir -p src/app/admin/{dashboard,products,login}
mkdir -p src/components/{admin,ui,product}
mkdir -p src/lib/{cloudinary,utils,hooks}
mkdir -p src/types

# Δημιουργία του αρχείου περιβάλλοντος
echo "[4/12] Δημιουργία αρχείου .env.local..."
cat > .env.local << 'EOL'
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=duabzt63b
CLOUDINARY_API_KEY=468359588455671
CLOUDINARY_API_SECRET=btslEhP3uqzui8hwwUonuY2mhDg
CLOUDINARY_UPLOAD_PRESET=melisa_unsigned
EOL

# Δημιουργία του αρχείου layout για το admin
echo "[5/12] Δημιουργία του admin layout..."
cat > src/app/admin/layout.tsx << 'EOL'
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Έλεγχος αν ο χρήστης είναι συνδεδεμένος
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    // Αν δεν είναι συνδεδεμένος, ανακατεύθυνση στη σελίδα login
    if (!isLoggedIn && window.location.pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [router]);

  // Έλεγχος αν βρισκόμαστε στη σελίδα login
  const isLoginPage = typeof window !== 'undefined' && window.location.pathname === '/admin/login';

  return (
    <div className="flex h-screen bg-gray-100">
      {!isLoginPage && <AdminSidebar />}
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
    </div>
  );
}
EOL

# Δημιουργία του AdminSidebar component
echo "[6/12] Δημιουργία του AdminSidebar component..."
cat > src/components/admin/AdminSidebar.tsx << 'EOL'
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Προϊόντα', href: '/admin/products' },
    { label: 'Κατηγορίες', href: '/admin/categories' },
    { label: 'Πολυμέσα', href: '/admin/media' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <div className="text-xl font-bold mb-8">AION CMS</div>
      <nav>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                className={clsx(
                  "block p-2 rounded hover:bg-gray-700 transition",
                  pathname === link.href && "bg-gray-700"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-8">
        <button 
          onClick={handleLogout}
          className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Αποσύνδεση
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
EOL

# Δημιουργία της σελίδας login
echo "[7/12] Δημιουργία της σελίδας login..."
cat > src/app/admin/login/page.tsx << 'EOL'
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Απλός έλεγχος διαπιστευτηρίων (μόνο για εκπαιδευτικούς σκοπούς)
    if (username === 'admin' && password === 'admin123') {
      // Αποθήκευση κατάστασης σύνδεσης
      localStorage.setItem('isLoggedIn', 'true');
      // Ανακατεύθυνση στο dashboard
      router.push('/admin/dashboard');
    } else {
      setError('Λάθος όνομα χρήστη ή κωδικός πρόσβασης');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">AION CMS</h1>
        <h2 className="text-xl mb-6 text-center">Σύνδεση</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Όνομα χρήστη
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Κωδικός πρόσβασης
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Σύνδεση
          </button>
        </form>
        
        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>Για δοκιμή: username: admin, password: admin123</p>
        </div>
      </div>
    </div>
  );
}
EOL

# Δημιουργία της σελίδας dashboard
echo "[8/12] Δημιουργία της σελίδας dashboard..."
cat > src/app/admin/dashboard/page.tsx << 'EOL'
'use client';

import { useState, useEffect } from 'react';

// Τύπος για τη στατιστική κάρτα
type StatCardProps = {
  title: string;
  value: number;
  icon: string;
  color: string;
};

// Component για τη στατιστική κάρτα
const StatCard = ({ title, value, icon, color }: StatCardProps) => (
  <div className={`p-6 rounded-lg shadow-md ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white text-sm">{title}</p>
        <h3 className="text-white text-2xl font-bold">{value}</h3>
      </div>
      <div className="text-white text-3xl">{icon}</div>
    </div>
  </div>
);

export default function DashboardPage() {
  // Τα στατιστικά δεδομένα (στατικά για τώρα)
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    media: 0,
    users: 1
  });

  // Προσομοίωση φόρτωσης δεδομένων
  useEffect(() => {
    // Εδώ θα μπορούσαμε να φορτώσουμε τα δεδομένα από ένα API
    // Για τώρα, απλά θέτουμε κάποιες τιμές μετά από ένα μικρό delay
    const timer = setTimeout(() => {
      setStats({
        products: 24,
        categories: 6,
        media: 45,
        users: 1
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Καλωσήρθατε στο AION CMS</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Προϊόντα" 
          value={stats.products} 
          icon="📦" 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Κατηγορίες" 
          value={stats.categories} 
          icon="🗂️" 
          color="bg-green-500" 
        />
        <StatCard 
          title="Πολυμέσα" 
          value={stats.media} 
          icon="🖼️" 
          color="bg-purple-500" 
        />
        <StatCard 
          title="Χρήστες" 
          value={stats.users} 
          icon="👤" 
          color="bg-orange-500" 
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Γρήγορες Ενέργειες</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="p-4 bg-gray-100 rounded hover:bg-gray-200 transition">
            Προσθήκη Νέου Προϊόντος
          </button>
          <button className="p-4 bg-gray-100 rounded hover:bg-gray-200 transition">
            Ανέβασμα Εικόνας
          </button>
          <button className="p-4 bg-gray-100 rounded hover:bg-gray-200 transition">
            Προσθήκη Κατηγορίας
          </button>
        </div>
      </div>
    </div>
  );
}
EOL

# Δημιουργία της σελίδας προϊόντων
echo "[9/12] Δημιουργία της σελίδας προϊόντων..."
cat > src/app/admin/products/page.tsx << 'EOL'
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Τύπος για τα προϊόντα
type Product = {
  id: number;
  name: string;
  price: number;
  category?: string;
  image?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Προσομοίωση φόρτωσης δεδομένων από το API/Cloudinary
  useEffect(() => {
    // Εδώ θα φορτώναμε τα δεδομένα από το API/Cloudinary
    const timer = setTimeout(() => {
      const dummyProducts: Product[] = [
        { id: 1, name: 'Κερί με Βανίλια', price: 12.5, category: 'Κεριά' },
        { id: 2, name: 'Αρωματικό Κερί Melisa', price: 18.9, category: 'Κεριά' },
        { id: 3, name: 'Καστανή Ζάχαρη Bio', price: 3.5, category: 'Γλυκαντικά' },
        { id: 4, name: 'Μέλι Ανθέων', price: 8.75, category: 'Γλυκαντικά' },
        { id: 5, name: 'Φυστικοβούτυρο', price: 5.99, category: 'Επάλειψη' },
        { id: 6, name: 'Ταχίνι Ολικής', price: 4.5, category: 'Επάλειψη' },
      ];
      
      setProducts(dummyProducts);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Φιλτράρισμα προϊόντων βάσει αναζήτησης
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Διαχείριση Προϊόντων</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          + Νέο Προϊόν
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Αναζήτηση προϊόντων..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p>Φόρτωση προϊόντων...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Προϊόν
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Κατηγορία
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Τιμή
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ενέργειες
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-full mr-4">
                        {/* Εδώ θα μπορούσαμε να έχουμε μια εικόνα του προϊόντος */}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {product.category || 'Χωρίς κατηγορία'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.price.toFixed(2)} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                      Επεξεργασία
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Διαγραφή
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p>Δεν βρέθηκαν προϊόντα που να ταιριάζουν με την αναζήτησή σας.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
EOL

# Δημιουργία του cloudinary utility
echo "[10/12] Δημιουργία του cloudinary utility..."
cat > src/lib/cloudinary/index.ts << 'EOL'
import { v2 as cloudinary } from 'cloudinary';

// Ρύθμιση του Cloudinary με τα κλειδιά από τις μεταβλητές περιβάλλοντος
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Ανεβάζει μια εικόνα στο Cloudinary
 * @param file Το αρχείο προς ανέβασμα
 * @returns Πληροφορίες για την εικόνα που ανέβηκε
 */
export const uploadImage = async (file: File) => {
  try {
    // Μετατροπή του αρχείου σε base64
    const base64data = await toBase64(file);
    
    // Δημιουργία του FormData για το upload
    const formData = new FormData();
    formData.append('file', base64data);
    formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET || 'melisa_unsigned');
    
    // Ανέβασμα στο Cloudinary μέσω του API
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    return await response.json();
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

/**
 * Ανακτά εικόνες από το Cloudinary
 * @param folder Ο φάκελος από τον οποίο θα ανακτηθούν οι εικόνες (προαιρετικό)
 * @returns Λίστα με τις εικόνες
 */
export const getImages = async (folder?: string) => {
  try {
    // Ετοιμάζουμε τις παραμέτρους για το API
    const params: any = {
      resource_type: 'image',
      max_results: 100,
    };
    
    if (folder) {
      params.prefix = folder;
      params.type = 'upload';
    }
    
    // Κλήση του API για να πάρουμε τις εικόνες
    const result = await cloudinary.api.resources(params);
    
    return result.resources;
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    throw error;
  }
};

/**
 * Διαγράφει μια εικόνα από το Cloudinary
 * @param publicId Το public ID της εικόνας
 * @returns Αποτέλεσμα της διαγραφής
 */
export const deleteImage = async (publicId: string) => {
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
};

/**
 * Μετατρέπει ένα αρχείο σε base64 string
 * @param file Το αρχείο προς μετατροπή
 * @returns base64 string
 */
const toBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
EOL

# Δημιουργία του ImageUploader component
echo "[11/12] Δημιουργία του ImageUploader component..."
cat > src/components/admin/ImageUploader.tsx << 'EOL'
'use client';

import { useState } from 'react';
import { uploadImage } from '@/lib/cloudinary';

type ImageUploaderProps = {
  onUploadSuccess?: (imageData: any) => void;
};

export default function ImageUploader({ onUploadSuccess }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Δημιουργία preview URL για την εικόνα
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    setUploadError(null);
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const fileInput = e.currentTarget.elements.namedItem('image') as HTMLInputElement;
    const file = fileInput.files?.[0];
    
    if (!file) {
      setUploadError('Παρακαλώ επιλέξτε ένα αρχείο.');
      return;
    }
    
    setIsUploading(true);
    
    try {
      const uploadResult = await uploadImage(file);
      
      if (uploadResult.error) {
        setUploadError(uploadResult.error.message || 'Σφάλμα κατά το ανέβασμα.');
      } else {
        if (onUploadSuccess) {
          onUploadSuccess(uploadResult);
        }
        
        // Καθαρισμός μετά από επιτυχία
        setPreviewUrl(null);
        fileInput.value = '';
      }
    } catch (error: any) {
      setUploadError(error.message || 'Απρόσμενο σφάλμα κατά το ανέβασμα.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Ανέβασμα Εικόνας</h2>
      
      {uploadError && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {uploadError}
        </div>
      )}
      
      <form onSubmit={handleUpload}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="image">
            Επιλογή εικόνας
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            disabled={isUploading}
          />
        </div>
        
        {previewUrl && (
          <div className="mb-4">
            <p className="text-gray-700 mb-2">Προεπισκόπηση:</p>
            <div className="w-full h-48 bg-gray-100 rounded overflow-hidden">
              <img 
                src={previewUrl} 
                alt="Προεπισκόπηση" 
                className="w-full h-full object-contain" 
              />
            </div>
          </div>
        )}
        
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          disabled={isUploading}
        >
          {isUploading ? 'Ανέβασμα...' : 'Ανέβασμα Εικόνας'}
        </button>
      </form>
    </div>
  );
}
EOL

# Δημιουργία της αρχικής σελίδας
echo "[12/12] Δημιουργία της αρχικής σελίδας..."
cat > src/app/page.tsx << 'EOL'
import { redirect } from 'next/navigation';

export default function Home() {
  // Ανακατεύθυνση στην σελίδα login του admin panel
  redirect('/admin/login');
}
EOL

# Κάνε το script εκτελέσιμο
chmod +x setup-aion-cms.sh

echo ""
echo "=========================================="
echo "Η δημιουργία του script ολοκληρώθηκε!"
echo "Εκτέλεσε το με την εντολή: ./setup-aion-cms.sh"
echo "=========================================="